import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const ImageUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      axios
        .post('http://localhost:8080/images', formData)
        .then((response) => {
          setImages([...images, response.data]);
        })
        .catch((error) => {
          console.error('Error uploading image ', error);
        });
    }
  };

  const handleSortByName = () => {
    const sortedImages = [...images].sort((a, b) => a.name.localeCompare(b.name));
    setImages(sortedImages);
  };

  const handleDeleteImage = (id: any) => {
    axios
      .delete(`http://localhost:8080/images/${id}`)
      .then(() => {
        setImages(images.filter((image) => image.id !== id));
      })
      .catch((error) => {
        console.error('Error ', error);
      });
  };

  
  const extractImageName = (fileName: string) => {
    const nameParts = fileName.split('.');
    if (nameParts.length > 1) {
      nameParts.pop();
    }
    return nameParts.join('.');
  };
  return (
    <div>

      <Button variant="contained" color="primary" sx={{margin:8}} >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      <Button variant="contained" color="primary" sx={{margin:8}} onClick={handleImageUpload}>
        Upload Image
      </Button>
      <Button variant="contained" color="secondary"sx={{margin:8}} onClick={handleSortByName}>
        Sort by Name
      </Button>
      <ImageList sx={{ width: '100%', height: 600, }} cols={3} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img src={`http://localhost:8080/images/${image.id}`} alt={image.name} loading="lazy" />
            <Typography variant="subtitle1" align="center">
              {extractImageName(image.name)}
            </Typography>
            <IconButton
              style={{ position: 'absolute', bottom: -5, right: 0 }}
              aria-label="delete"
              onClick={() => handleDeleteImage(image.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ImageListItem>
        
        ))}
      </ImageList>
    </div>
  );
};

export default ImageUploader;
