
import React, { useState } from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Edit, Plus, Image, Check } from 'lucide-react';
import { toast } from 'sonner';

// Mock image data for demonstration
const mockImages = [
  { id: 1, title: 'Desert Quad Tour', category: 'tours', url: 'https://images.unsplash.com/photo-1628627260268-89651013d867?w=800&auto=format&fit=crop' },
  { id: 2, title: 'Quad Bike Lineup', category: 'quads', url: 'https://images.unsplash.com/photo-1615317779547-2be463b9f2f9?w=800&auto=format&fit=crop' },
  { id: 3, title: 'Sahara Landscape', category: 'landscapes', url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop' },
  { id: 4, title: 'Red Quad Bike', category: 'quads', url: 'https://images.unsplash.com/photo-1618713411788-756b6b3a73eb?w=800&auto=format&fit=crop' },
  { id: 5, title: 'Group Tour Photo', category: 'tours', url: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=800&auto=format&fit=crop' },
  { id: 6, title: 'Dune Adventure', category: 'landscapes', url: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&auto=format&fit=crop' },
];

const MediaGallery = () => {
  const [images, setImages] = useState(mockImages);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [newImageData, setNewImageData] = useState({ title: '', category: 'tours', url: '' });
  const [activeTab, setActiveTab] = useState('all');

  // Filter images based on active tab
  const filteredImages = activeTab === 'all' 
    ? images 
    : images.filter(img => img.category === activeTab);
  
  // Handle adding a new image
  const handleAddImage = () => {
    const id = Math.max(...images.map(img => img.id)) + 1;
    const newImage = {
      id,
      title: newImageData.title,
      category: newImageData.category,
      url: newImageData.url
    };
    
    setImages([...images, newImage]);
    setNewImageData({ title: '', category: 'tours', url: '' });
    setIsAddDialogOpen(false);
    toast.success('Image added successfully!');
  };
  
  // Handle editing an image
  const handleEditImage = () => {
    const updatedImages = images.map(img => 
      img.id === currentImage.id ? { ...currentImage } : img
    );
    
    setImages(updatedImages);
    setCurrentImage(null);
    setIsEditDialogOpen(false);
    toast.success('Image updated successfully!');
  };
  
  // Handle deleting an image
  const handleDeleteImage = () => {
    const updatedImages = images.filter(img => img.id !== currentImage.id);
    setImages(updatedImages);
    setCurrentImage(null);
    setIsDeleteDialogOpen(false);
    toast.success('Image deleted successfully!');
  };
  
  // Open edit dialog
  const openEditDialog = (image: any) => {
    setCurrentImage(image);
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (image: any) => {
    setCurrentImage(image);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Gallery</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage images across your website</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-terracotta-600 hover:bg-terracotta-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Button>
      </div>
      
      {/* Image category filter tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="quads">Quads</TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="landscapes">Landscapes</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map(image => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video relative group">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button 
                  size="sm"
                  onClick={() => openEditDialog(image)}
                  variant="secondary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={() => openDeleteDialog(image)}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="font-medium">{image.title}</p>
              <p className="text-sm text-gray-500 capitalize">{image.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Image className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No images found</h3>
          <p className="text-gray-500 mt-1">
            {activeTab === 'all' 
              ? 'Start adding images to your gallery' 
              : `No images found in the ${activeTab} category`}
          </p>
        </div>
      )}
      
      {/* Add Image Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Image Title</Label>
              <Input 
                id="title" 
                value={newImageData.title}
                onChange={(e) => setNewImageData({...newImageData, title: e.target.value})}
                placeholder="Enter image title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                value={newImageData.category}
                onChange={(e) => setNewImageData({...newImageData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta-500 dark:border-gray-700 dark:bg-sand-800"
              >
                <option value="quads">Quads</option>
                <option value="tours">Tours</option>
                <option value="landscapes">Landscapes</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Image URL</Label>
              <Input 
                id="url" 
                value={newImageData.url}
                onChange={(e) => setNewImageData({...newImageData, url: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            {newImageData.url && (
              <div className="mt-4 border rounded-md overflow-hidden">
                <img 
                  src={newImageData.url} 
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleAddImage}
              disabled={!newImageData.title || !newImageData.url}
            >
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Image Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {currentImage && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Image Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentImage.title}
                  onChange={(e) => setCurrentImage({...currentImage, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <select 
                  id="edit-category"
                  value={currentImage.category}
                  onChange={(e) => setCurrentImage({...currentImage, category: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-terracotta-500 dark:border-gray-700 dark:bg-sand-800"
                >
                  <option value="quads">Quads</option>
                  <option value="tours">Tours</option>
                  <option value="landscapes">Landscapes</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-url">Image URL</Label>
                <Input 
                  id="edit-url" 
                  value={currentImage.url}
                  onChange={(e) => setCurrentImage({...currentImage, url: e.target.value})}
                />
              </div>
              <div className="mt-4 border rounded-md overflow-hidden">
                <img 
                  src={currentImage.url} 
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Invalid+Image+URL';
                  }}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-terracotta-600 hover:bg-terracotta-700"
              onClick={handleEditImage}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Image Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Image</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this image? This action cannot be undone.</p>
          {currentImage && (
            <div className="mt-4 border rounded-md overflow-hidden">
              <img 
                src={currentImage.url} 
                alt={currentImage.title}
                className="w-full h-40 object-cover"
              />
              <p className="p-2 text-center font-medium">{currentImage.title}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteImage}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaGallery;
