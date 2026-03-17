import React, { useState } from 'react';
import { Modal } from './Modal';
import { AddCardFormData } from '../../types';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: AddCardFormData) => Promise<void>;
  loading?: boolean;
}

interface FormErrors {
  name?: string;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<AddCardFormData>({
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Card name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Card name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Card name must not exceed 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Card name can only contain letters and spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on successful submission
      setFormData({ name: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Failed to add card:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setFormData({ name: '' });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Card"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="cardName"
            className="block text-sm font-medium text-aspire-text-primary mb-2"
          >
            Card Name
          </label>
          <input
            type="text"
            id="cardName"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter cardholder name"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-aspire-green focus:border-aspire-green outline-none transition-colors ${
              errors.name
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300'
            }`}
            disabled={submitting}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="bg-aspire-gray p-4 rounded-lg mb-6">
          <h4 className="text-sm font-medium text-aspire-text-primary mb-2">
            Card Details
          </h4>
          <p className="text-sm text-aspire-text-secondary">
            The card number, expiry date, and CVV will be automatically generated for security purposes.
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 px-4 py-3 border border-gray-300 text-aspire-text-primary rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || loading}
            className="flex-1 px-4 py-3 bg-aspire-green text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting || loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Add Card'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};