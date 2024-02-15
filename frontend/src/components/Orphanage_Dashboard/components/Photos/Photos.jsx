import React, { useEffect, useState } from 'react';
import './Photos.css';
import { useUser } from '../../../../UserContext';
import { message } from 'antd';
import axios from 'axios';


const PhotosComponent = () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [orphanageImages, setOrphanageImages] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8079/orphanage/${userDetails.orpId}/orphanageDetails/viewImages`);
        setOrphanageImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, []);

  const formdata = new FormData();

  const handleFileUpload = (e) => {
    const files = e.target.files;
    console.log(files);

    // File size validation
    const invalidFiles = Array.from(files).filter((file) => file.size > MAX_FILE_SIZE);
    if (invalidFiles.length > 0) {
      message.error(
        `Files ${invalidFiles.map((file) => file.name).join(', ')} exceed the maximum size of 5 MB. Please select smaller files.`
      );
      return;
    }

    // Update upload limit based on current files and orphanage images
    const totalImageCount = uploadedFiles.length + orphanageImages.length + files.length;
    if (totalImageCount > 15) {
      message.error("Your can't upload images more than your limit");
      return;
    }

    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const { userDetails } = useUser();

  useEffect(() => {
    formdata.append("images", uploadedFiles);
  }, [uploadedFiles]);

  const handleRemoveFile = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleOkButtonClick = async () => {
    console.log("Hello", uploadedFiles, formdata);
    if (uploadedFiles.length > 0) {
      try {
        const response = await axios.post(
          `http://localhost:8079/orphanage/${userDetails.orpId}/orphanageDetails/uploadImages`,
          uploadedFiles,
          { params: { images: uploadedFiles }, headers: { 'Content-Type': 'multipart/form-data' } }
        );
        message.success(response.data);
        setUploadedFiles([]); // Clear uploaded files after successful upload
      } catch (error) {
        console.error(error);
        message.error(error.message || 'An error occurred while uploading images. Please try again later.');
      }
    } else {
      message.info('No files selected to upload.');
    }
  };

  return (
           <div className="photos-container">
      <h1>Photos</h1>
      <h3>Upload pictures of your orphanage's activities and events.</h3>
      <p>
         Accepted formats: png, jpg, jpeg.
      </p>
      <p> Maximum file size: 5 MB</p>

      <label className="file-upload-label">
        Upload Pictures:
        <input disabled={orphanageImages?.length>15} type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileUpload} multiple />
      </label>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <p>Uploaded Files:</p>
          <ul>
            {uploadedFiles?.map((file, index) => (
              <li key={index}>
                {file.name}
                <button className="remove-button" onClick={() => handleRemoveFile(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="ok-button" onClick={handleOkButtonClick}>
        Upload
      </button>
    </div> 
    
    
  );
};

export default PhotosComponent;
