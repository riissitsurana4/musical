'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function SubmitProjectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        repositoryUrl: '',
        hackatimeProject: '',
        hackatimeTime: ''
    });
    const [hackatimeProjects, setHackatimeProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session) {
            fetchHackatimeProjects();
        }
    }, [session]);

    const fetchHackatimeProjects = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/hackatime?type=projects');
            const data = await response.json();
            setHackatimeProjects(data.projects || []);
        } catch (error) {
            console.error('Error fetching Hackatime projects:', error);
            setHackatimeProjects([]);
            setError('Failed to load Hackatime projects');
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (error) setError('');
    };

    const handleHackatimeSelect = (e) => {
        const selectedProject = hackatimeProjects.find(p => p.name === e.target.value);
        if (selectedProject) {
            setFormData(prev => ({
                ...prev,
                hackatimeProject: selectedProject.name,
                hackatimeTime: selectedProject.time
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                hackatimeProject: '',
                hackatimeTime: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/my-projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newProject = await response.json();
                setSubmitted(true);
                console.log('Project submitted successfully:', newProject);
                
                
                setFormData({
                    name: '',
                    description: '',
                    repositoryUrl: '',
                    hackatimeProject: '',
                    hackatimeTime: ''
                });

                
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to submit project');
            }
        } catch (error) {
            console.error('Error submitting project:', error);
            setError('Network error. Please try again.');
        }
        setSubmitting(false);
    };
    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FontAwesomeIcon icon={faSpinner} className="text-4xl text-purple-500 animate-spin" />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">   
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
                    <p className="text-gray-600">You need to be logged in to submit a project.</p>
                </div>
            </div>
        );
    }
    return (
        <div>

        </div>
    );
}