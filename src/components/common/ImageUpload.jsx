import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadAPI } from '../../services/api';
import Button from './Button';

const ImageUpload = ({ 
  onUpload, 
  multiple = false, 
  preview = true,
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      if (multiple) {
        const response = await uploadAPI.uploadImages(files);
        const uploadedFiles = response.data.files;
        
        if (preview) {
          setPreviews(prev => [...prev, ...uploadedFiles]);
        }
        
        onUpload(uploadedFiles);
      } else {
        const response = await uploadAPI.uploadImage(files[0]);
        const uploadedFile = response.data;
        
        if (preview) {
          setPreviews([uploadedFile]);
        }
        
        onUpload(uploadedFile);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image(s)');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        id="image-upload"
      />
      
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors duration-200"
      >
        {uploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-2">Click to upload image{multiple ? 's' : ''}</p>
            <p className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </label>

      {preview && previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={file.url}
                alt={file.originalName}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removePreview(index)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;