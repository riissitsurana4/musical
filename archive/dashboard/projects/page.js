'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faFolder, faExternalLinkAlt, faTimes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function ProjectsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        repositoryUrl: '',
        hackatimeProject: '',
        hackatimeTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [hackatimeProjects, setHackatimeProjects] = useState([]);
    const [hackatimeLoading, setHackatimeLoading] = useState(false);

    useEffect(() => {
        if (session) {
            fetchProjects();
            fetchHackatimeProjects();
        }
    }, [session]);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/my-projects');
            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects:', response.status);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchHackatimeProjects = async () => {
        try {
            setHackatimeLoading(true);
            const response = await fetch('/api/hackatime?type=projects');
            
            if (response.ok) {
                const data = await response.json();
                setHackatimeProjects(data.projects || []);
            }
        } catch (error) {
            console.error('Error fetching Hackatime projects:', error);
        } finally {
            setHackatimeLoading(false);
        }
    };

    const handleHackatimeSelect = (e) => {
        const selectedProject = hackatimeProjects.find(p => p.name === e.target.value);
        setFormData({
            ...formData,
            hackatimeProject: e.target.value,
            hackatimeTime: selectedProject ? selectedProject.time : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = editingProject ? '/api/my-projects' : '/api/my-projects';
            const method = editingProject ? 'PUT' : 'POST';
            const body = editingProject 
                ? JSON.stringify({ ...formData, id: editingProject.id })
                : JSON.stringify(formData);

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });

            if (response.ok) {
                handleCloseModal();
                fetchProjects();
            } else {
                console.error('Failed to save project');
            }
        } catch (error) {
            console.error('Error submitting project:', error);
        }
        setLoading(false);
    };

    const handleDelete = async (projectId) => {
        if (!confirm('Are you sure you want to delete this project?')) {
            return;
        }

        try {
            const response = await fetch(`/api/my-projects`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: projectId }),
            });

            if (response.ok) {
                fetchProjects();
            } else {
                console.error('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            repositoryUrl: project.repositoryUrl || '',
            hackatimeProject: project.hackatimeProject || '',
            hackatimeTime: project.hackatimeTime || ''
        });
        setShowForm(true);
        fetchHackatimeProjects();
    };

    const handleCloseModal = () => {
        setShowForm(false);
        setEditingProject(null);
        setFormData({
            name: '',
            description: '',
            repositoryUrl: '',
            hackatimeProject: '',
            hackatimeTime: ''
        });
    };

    if (status === 'loading') {
        return <div className="p-8">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        return <div className="p-8">Please log in to view projects.</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="p-2 text-gray-500 rounded-lg"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <h1 className="text-3xl font-semibold text-gray-900">Projects</h1>
                        </div>
                        
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setEditingProject(null);
                                setFormData({
                                    name: '',
                                    description: '',
                                    repositoryUrl: '',
                                    hackatimeProject: '',
                                    hackatimeTime: ''
                                });
                                fetchHackatimeProjects();
                            }}
                            className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span className="font-medium">Add Project</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-8 py-8">

                {showForm && (
                    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingProject ? 'Edit Project' : 'Add New Project'}
                                </h2>
                                <button
                                    onClick={handleCloseModal}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Project Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="Enter project name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg"
                                                rows={4}
                                                placeholder="Describe your project"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Repository URL (optional)
                                            </label>
                                            <input
                                                type="url"
                                                value={formData.repositoryUrl}
                                                onChange={(e) => setFormData({...formData, repositoryUrl: e.target.value})}
                                                className="w-full text-gray-900  px-4 py-3 border border-gray-300 rounded-lg"
                                                placeholder="https://github.com/username/project"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Link to Hackatime Project (optional)
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={fetchHackatimeProjects}
                                                    disabled={hackatimeLoading}
                                                    className="text-sm text-purple-600 hover:text-purple-800 disabled:opacity-50"
                                                >
                                                    {hackatimeLoading ? 'Loading...' : 'Refresh'}
                                                </button>
                                            </div>
                                            <select
                                                value={formData.hackatimeProject}
                                                onChange={handleHackatimeSelect}
                                                className="w-full px-4 py-3 text-gray-900  border border-gray-300 rounded-lg"
                                                disabled={hackatimeLoading}
                                            >
                                                <option value="">
                                                    {hackatimeLoading 
                                                        ? 'Loading Hackatime projects...' 
                                                        : 'Select a Hackatime project (optional)'
                                                    }
                                                </option>
                                                {!hackatimeLoading && hackatimeProjects.map((project, index) => (
                                                    <option key={index} value={project.name}>
                                                        {project.name} ({project.time})
                                                    </option>
                                                ))}
                                            </select>
                                            {!hackatimeLoading && hackatimeProjects.length === 0 && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    No Hackatime projects found. Make sure you have projects tracked in Hackatime.
                                                </p>
                                            )}
                                            {hackatimeProjects.length > 0 && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Found {hackatimeProjects.length} Hackatime projects
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg "
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                                        >
                                            {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-gray-400 mb-6">
                                <FontAwesomeIcon icon={faFolder} size="4x" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No projects yet</h3>
                            <p className="text-gray-500 text-lg mb-8">Start by adding your first project!</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center space-x-3 px-8 py-4 bg-purple-600 text-white rounded-lg"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Add Your First Project</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-sm text-gray-500">
                                                {new Date(project.createdAt).toLocaleDateString()}
                                            </div>
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit project"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete project"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                                    <div className="flex flex-wrap gap-4">
                                        {project.repositoryUrl && (
                                            <a 
                                                href={project.repositoryUrl} 
                                                target="_blank" 
                                                rel=""
                                                className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                                            >
                                                <span>View Repository</span>
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            </a>
                                        )}
                                        {project.hackatimeProject && (
                                            <div className="flex items-center space-x-2 text-green-600">
                                                <span className="text-sm font-medium">
                                                    Hackatime: {project.hackatimeProject}
                                                </span>
                                                {project.hackatimeTime && (
                                                    <span className="text-sm">({project.hackatimeTime})</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}