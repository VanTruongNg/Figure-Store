import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useAppDispatch, useAppSelector } from "../../../../../common/redux";
import { getProducts } from "../../../../../store/redux-thunk";
import {
  deleteProduct,
  postAddImage,
  postAddProduct,
  putUpdateProduct,
} from "../../../../../store/redux-thunk/ProductThunk";
import { formatPrice } from "../../../../../utils";
import { webLogo } from "../../../../../assets";

const ProductAdmin = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.home.products);
  const categories = useAppSelector((state) => state.home.categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [file, setFile] = useState<File | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedProductForImage, setSelectedProductForImage] = useState<
    string | null
  >(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    scale: "",
    category: "",
  });

  useEffect(() => {
    dispatch(getProducts());
  }, [products]);

  const openModal = (product: Product | null) => {
    setModalOpen(true);
    if (product) {
      setEditMode(true);
      setSelectedProductId(product.id);
      setProductForm({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        scale: product.scale,
        category: product.category,
      });
    } else {
      setEditMode(false);
      setSelectedProductId(null);
      setProductForm({
        name: "",
        description: "",
        price: 0,
        brand: "",
        scale: "",
        category: "",
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
  };

  const openImageModal = (productId: string) => {
    setImageModalOpen(true);
    setSelectedProductId(productId);
  };

  const handleCloseImageModal = () => {
    setImageModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOpenUploadModal = (productId: string) => {
    setUploadModalOpen(true);
    setSelectedProductForImage(productId);
  };

  const handleCloseUploadModal = () => {
    setUploadModalOpen(false);
    setSelectedProductForImage(null);
    setPreviewImageUrl(null);
    setFile(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImageUrl(imageUrl);
      setFile(selectedFile);
    }
  };

  const handleAddImage = async () => {
    if (selectedProductForImage && previewImageUrl) {
      const formData = new FormData();
      formData.append("productId", selectedProductForImage);
      formData.append("image", file);

      try {
        await dispatch(postAddImage(formData));
        handleCloseUploadModal();
      } catch (error) {
        console.error("Failed to add image:", error);
      }
    }
  };

  const handleAddProduct = () => {
    openModal(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      console.log(selectedProductId, productForm);
      await dispatch(
        putUpdateProduct({ id: selectedProductId, product: productForm })
      );
    } else {
      await dispatch(postAddProduct(productForm));
    }
    setModalOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <IconButton color="primary" onClick={handleAddProduct}>
            <AddIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images.length > 0 ? (
                      <img
                        src={`http://localhost:8080/images/${product.images[0].url}`}
                        style={{ width: 100, height: 100 }}
                        alt={product.name}
                      />
                    ) : (
                      <img
                        src={webLogo}
                        style={{ width: 100, height: 100 }}
                        alt="Web Logo"
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.category[0].name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => openModal(product)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => dispatch(deleteProduct(product.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => openImageModal(product.id)}
                      sx={{ mr: 1 }}
                    >
                      <ViewCarouselIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenUploadModal(product.id)}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Image display modal */}
      <Dialog
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        maxWidth="lg"
      >
        <DialogTitle>Product Images</DialogTitle>
        <DialogContent>
          {selectedProductId && (
            <Grid container spacing={2}>
              {products
                .find((product) => product.id === selectedProductId)
                ?.images.map((image, index) => (
                  <Grid item xs={4} key={image.url}>
                    <img
                      src={`http://localhost:8080/images/${image.url}`}
                      style={{ width: "100%", height: "auto" }}
                      alt={`Product image ${index + 1}`}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Upload image modal */}
      <Dialog open={uploadModalOpen} onClose={handleCloseUploadModal}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-image">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<PhotoCameraIcon />}
            >
              Upload Image
            </Button>
          </label>
          {previewImageUrl && (
            <Box mt={2}>
              <Typography variant="subtitle1">Image Preview:</Typography>
              <img
                src={previewImageUrl}
                style={{ width: "100%", height: "auto" }}
                alt="Preview"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddImage}
            color="primary"
            disabled={!previewImageUrl}
          >
            Add Image
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={productForm.name}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              type="number"
              value={productForm.price}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              value={productForm.description}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="brand"
              label="Brand"
              variant="outlined"
              value={productForm.brand}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="scale"
              label="Scale"
              variant="outlined"
              value={productForm.scale}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            />
            <TextField
              name="category"
              label="Category"
              select
              value={productForm.category}
              onChange={handleChange}
              sx={{ mb: 2, width: "100%" }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions>
              <Button onClick={closeModal} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editMode ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductAdmin;
