import React, { useState } from "react";
import { X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import {toast} from "react-hot-toast";
const ProductFormModal = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
	formType = "add",
}) => {
	const [formData, setFormData] = useState(
		initialData || {
			id: "",
			name: "",
			category: "",
			price: "",
			stock: "",
			status: "Active",
			description: "",
			variations: [],
			tags: [],
			images: [],
		}
	);

	const [newVariation, setNewVariation] = useState("");
	const [newTag, setNewTag] = useState("");

	if (!isOpen) return null;

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddVariation = () => {
		if (newVariation.trim()) {
			setFormData((prev) => ({
				...prev,
				variations: [...prev.variations, newVariation.trim()],
			}));
			setNewVariation("");
		}
	};

	const handleRemoveVariation = (index) => {
		setFormData((prev) => ({
			...prev,
			variations: prev.variations.filter((_, i) => i !== index),
		}));
	};

	const handleAddTag = () => {
		if (newTag.trim()) {
			setFormData((prev) => ({
				...prev,
				tags: [...prev.tags, newTag.trim()],
			}));
			setNewTag("");
		}
	};

	const handleRemoveTag = (index) => {
		setFormData((prev) => ({
			...prev,
			tags: prev.tags.filter((_, i) => i !== index),
		}));
	};

	const handleImageUpload = (newImages) => {
		setFormData((prev) => ({
			...prev,
			images: [...prev.images, ...newImages].slice(0, 4),
		}));
	};

	const handleImageRemove = (index) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const priceNum = parseFloat(formData.price);
		if (isNaN(priceNum) || priceNum <= 0) {
			toast("Please enter a valid price.", {
				icon:'⚠️'
			});
			return;
		}
		if (!formData.name.trim() || !formData.category.trim()) {
			toast("Name and category are required.", {
				icon:'⚠️'
			});
			return;
		}

		onSubmit(formData);
	};

	return (
		<div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<form onSubmit={handleSubmit} className="p-6">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-lg font-semibold">
							{formType === "add"
								? "Add Product"
								: "Edit Product"}
						</h3>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600"
						>
							<X className="h-5 w-5" />
						</button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Tên sản phẩm
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Thuộc danh mục
							</label>
							<input
								type="text"
								name="category"
								value={formData.category}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Giá tiền ($)
							</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								onChange={handleFormChange}
								step="0.01"
								min="0"
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Tồn kho
							</label>
							<input
								type="number"
								name="stock"
								value={formData.stock}
								onChange={handleFormChange}
								min="0"
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Trạng thái
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							>
								<option value="Active">Active</option>
								<option value="Low Stock">Low Stock</option>
								<option value="Out of Stock">
									Hết hàng
								</option>
								<option value="Clearance">Giải phóng đơn hàng</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Mã sản phẩm (SKU)	
							</label>
							<input
								type="text"
								name="sku"
								value={formData.sku}
								onChange={handleFormChange}
								className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							/>
						</div>
					</div>
					<div className="mt-6">
						<label className="block text-sm font-medium text-gray-700">
							Mô tả 
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleFormChange}
							className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							rows="4"
						></textarea>
					</div>

					<ImageUploader
						images={formData.images}
						onUpload={handleImageUpload}
						onRemove={handleImageRemove}
						maxImages={4}
					/>

					<div className="mt-6">
						<label className="block text-sm font-medium text-gray-700">
							Thuộc tính sản phẩm (Variations)
						</label>
						<div className="flex gap-2 mt-1">
							<input
								type="text"
								value={newVariation}
								onChange={(e) =>
									setNewVariation(e.target.value)
								}
								className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								placeholder="Enter variation (e.g., Red, XL)"
							/>
							<button
								type="button"
								onClick={handleAddVariation}
								className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
							>
								Thêm
							</button>
						</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{formData.variations.map((variation, index) => (
								<div
									key={index}
									className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
								>
									{variation}
									<button
										type="button"
										onClick={() =>
											handleRemoveVariation(index)
										}
										className="ml-2 text-red-500 hover:text-red-700"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							))}
						</div>
					</div>

					<div className="mt-6">
						<label className="block text-sm font-medium text-gray-700">
							Nhãn sản phẩm (Tags)
						</label>
						<div className="flex gap-2 mt-1">
							<input
								type="text"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								placeholder="Enter tag (e.g., Summer, Casual)"
							/>
							<button
								type="button"
								onClick={handleAddTag}
								className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
							>
								Thêm nhãn
							</button>
						</div>
						<div className="mt-2 flex flex-wrap gap-2">
							{formData.tags.map((tag, index) => (
								<div
									key={index}
									className="flex items-center px-3 py-1 bg-blue-100 rounded-full text-blue-800 text-sm"
								>
									{tag}
									<button
										type="button"
										onClick={() => handleRemoveTag(index)}
										className="ml-2 text-red-500 hover:text-red-700"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							))}
						</div>
					</div>

					<div className="mt-6 flex justify-end space-x-3">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
						>
							Hủy bỏ
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
						>
							{formType === "add"
								? "Thêm sản phẩm"
								: "Lưu các thay đổi "}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductFormModal;
