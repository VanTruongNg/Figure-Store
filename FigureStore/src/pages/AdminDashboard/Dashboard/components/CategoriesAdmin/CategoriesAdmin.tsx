import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../../../common/redux";
import {
  deleteCategory,
  postAddCategory,
  putUpdateCategory,
} from "../../../../../store/redux-thunk/CategoryThunk";

interface Category {
  id: string;
  name: string;
}

const CategoryAdmin = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.home.categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });

  const openModal = (category: Category | null) => {
    setModalOpen(true);
    if (category) {
      setEditMode(true);
      setSelectedCategoryId(category.id);
      setCategoryForm({
        name: category.name,
      });
    } else {
      setEditMode(false);
      setSelectedCategoryId(null);
      setCategoryForm({
        name: "",
      });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      await dispatch(
        putUpdateCategory({
          id: selectedCategoryId!,
          name: categoryForm.name,
        })
      );
    } else {
      await dispatch(postAddCategory(categoryForm));
    }
    setModalOpen(false);
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <IconButton color="primary" onClick={() => openModal(null)}>
            <AddIcon />
          </IconButton>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => openModal(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(category.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Add/Edit category modal */}
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle>{editMode ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              value={categoryForm.name}
              onChange={handleChange}
              fullWidth
              autoFocus
              margin="normal"
            />
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

export default CategoryAdmin;
