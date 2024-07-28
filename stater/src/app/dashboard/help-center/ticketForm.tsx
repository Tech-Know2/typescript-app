"use client";

import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { TicketType, SubjectMatter } from '../../../types/ticketType';
import { ResponseStatus } from '../../../types/ticketType';
import { AssistanceRating } from '../../../types/ticketType';

interface TicketFormProps {
    isFormVisible: boolean;
    toggleFormVisibility: () => void;
    onSubmit: (ticket: TicketType) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ isFormVisible, toggleFormVisibility, onSubmit }) => {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [selectedSubject, setSelectedSubject] = useState<SubjectMatter>(SubjectMatter.Other);
    const [questionHeader, setQuestionHeader] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [isFormValid, setFormValid] = useState(false);
    const [ticketIndex, setTicketIndex] = useState<number>(0);

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(event.target.value as SubjectMatter);
    };

    const handleHeaderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionHeader(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestionText(event.target.value);
    };

    const validateForm = () => {
        setFormValid(questionHeader.trim() !== "" && questionText.trim() !== "" && isAuthenticated === true);
    };

    useEffect(() => {
        validateForm();
    }, [questionHeader, questionText, isAuthenticated]);

    const handleSubmit = async () => {
        if (isAuthenticated) {
            try {
                // Fetch existing tickets to get the current ticket count
                const response = await fetch(`/api/tickets?userID=${user?.id || ''}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const tickets = await response.json();
                const currentTicketCount = tickets.length;

                // Create the new ticket with the updated ticketIndex
                const newTicket: TicketType = {
                    ticketIndex: currentTicketCount + 1, // Set ticketIndex to the current count + 1
                    userID: user?.id ?? "",
                    questionHeader,
                    questionText,
                    subjectMatter: selectedSubject,
                    responderUserID: " ",
                    responseText: " ",
                    responseStatus: ResponseStatus.Unanswered,
                    assistanceRating: AssistanceRating.Neutral,
                };

                onSubmit(newTicket);

                //After submitting clear inputted text, and return form to normal
                setSelectedSubject(SubjectMatter.Other);
                setQuestionHeader("");
                setQuestionText("");
                setFormValid(false);
                toggleFormVisibility();

            } catch (error) {
                console.error('Failed to fetch tickets', error);
            }
        }
    };

    return isFormVisible ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                <h2 className="text-xl font-bold">Create a Ticket</h2>

                <div className="flex flex-col">
                    <input
                        type="text"
                        value={questionHeader}
                        onChange={handleHeaderChange}
                        placeholder="Question Header"
                        className="border border-black rounded-md p-2 w-full"
                        maxLength={64} // Set max length for header
                    />
                    <div className="text-sm text-gray-600 mt-1">
                        {questionHeader.length} / 64 characters
                    </div>
                </div>

                <div className="flex space-x-4">
                    <select
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className="border border-black rounded-md p-2 w-1/5 h-1/2" // Set fixed width for dropdown
                    >
                        {Object.values(SubjectMatter).map(subject => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                    <div className='flex flex-col w-full'>
                        <textarea
                            value={questionText}
                            onChange={handleTextChange}
                            placeholder="Describe your issue here..."
                            className="border border-black rounded-md p-2 flex-1" // Flex-grow for text area
                            maxLength={1500} // Set max length for description
                        />
                        <div className="text-sm text-gray-600 mt-1">
                            {questionText.length} / 1500 characters
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                        onClick={toggleFormVisibility}
                    >
                        Cancel
                    </button>
                    <button
                        className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default TicketForm;