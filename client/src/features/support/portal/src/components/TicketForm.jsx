import { useState } from 'react';

export function TicketForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    priority: 'medium',
    category: 'Tech Support',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();                 // ← fix: no TS type on the param
    onSubmit?.(formData);
    setSubmitted(true);
    // optional reset:
    // setFormData({ name:'', email:'', subject:'', description:'', priority:'medium', category:'Tech Support' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;   // ← fix: use e.target.value
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm mb-1">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm mb-1">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm mb-1">Subject</label>
        <input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief summary"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue"
          required
          rows={5}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Priority + Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="priority" className="block text-sm mb-1">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option>Tech Support</option>
            <option>Home Services</option>
            <option>Legal Services</option>
            <option>Repairs & Maintenance</option>
            <option>Health & Wellness</option>
            <option>Accounting & Finance</option>
            <option>Beauty & Grooming</option>
            <option>Education</option>
            <option>Creative Services</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 px-4 py-2 rounded bg-black text-white hover:opacity-90"
      >
        Submit Ticket
      </button>

      {submitted && (
        <p className="text-sm text-green-600 mt-2">
          Ticket created! Check it in “My Tickets”.
        </p>
      )}
    </form>
  );
}
