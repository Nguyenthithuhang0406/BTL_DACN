import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import LayoutAdmin from "./LayoutAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { motion } from "framer-motion";
import ProductFilters from "@/components/admin/productAdmin/ProductFilters";
import ProductList from "@/components/admin/productAdmin/ProductList";
import ProductViewModal from "@/components/admin/productAdmin/ProductViewModal";
import ProductFormModal from "@/components/admin/productAdmin/ProductFormModal";
import {
	exportProductsToExcel,
	formatProductForSave,
	getProductStatusCounts,
} from "@/components/admin/productAdmin/productExcel";
import { productData } from "@/components/admin/productAdmin/productData";
import DeleteProductModal from "@/components/admin/productAdmin/DeleteProductModal";
const ProductAdminPage = () => {
	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [showModal, setShowModal] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [searchQuery, setSearchQuery] = useState("");
	const [hasNext, setHasNext] = useState(true);
	const [hasPrevious, setHasPrevious] = useState(true);
	const [apiPage, setApiPage] = useState(0);
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: null,
	});
	const [statusFilter, setStatusFilter] = useState("All");

	const statusCounts = getProductStatusCounts(products);

	const [token, setToken] = useState(
		'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnaEZQT3RhMXhva0NVX3ZjU25Zc19TTEZMOXdrVl9aUnNVWU5nXzAtQzV3In0.eyJleHAiOjE3NDg5ODYyMDgsImlhdCI6MTc0ODk4NDQwOCwianRpIjoiMGE4NTcwODEtMTFkZS00YzQxLWE5Y2MtZDcwODk4MDgxZWFmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkwL3JlYWxtcy9lY29tbWVyY2UiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNDIxNzU5NDUtODgxOS00MTU0LThlZTMtNWE1MDA1YTgzY2FiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWljcm8tc2VydmljZS1hcGkiLCJzZXNzaW9uX3N0YXRlIjoiNjVlM2ZlYWMtNzkxOC00MzI0LWIzNmYtMDhhMWY1ZmQ2NjZiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lY29tbWVyY2UiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiQURNSU4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI2NWUzZmVhYy03OTE4LTQzMjQtYjM2Zi0wOGExZjVmZDY2NmIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZG1pbiBhZG1pbjEyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwiZmFtaWx5X25hbWUiOiJhZG1pbjEyMyIsImVtYWlsIjoidnRobjMwM0BnbWFpbC5jb20ifQ.XtUjP4xuq6LPApkkKKDBl_Ah8cm03tl8iiOCUcKZvdm1_62BIGSLZOVo8TLptgq943NU78Q5zwkG0rEU4vY0F6hR0QYF-oSDzIhVBHmGqqDySIPszgLyeHPSuZzqvuzwEkQlrLmAcztmAQqpmQyRFyc1VpFYFDyqM8MVJ_KldO7B2Fd_F_bLjJYbCk4gn1zzoOQabnCHp-8TYR0z5elGARe-402CkNuyrNVF4s0nGoBNwNg40_vpr31mJYf03f3WVqj44m77o_IuDTtt5UuoikUCWM--fIbfexanfB5ZMdSKpyuBgGadBPeHaJVyh4WRcRszqG7YT5ffyojp7oFXSg'
	)
	


	const filteredProducts = products.filter(
		(product) =>
			(product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
			(statusFilter === "All" || product.status === statusFilter)
	);

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (!sortConfig.key) return 0;
		const aValue =
			sortConfig.key === "price"
				? parseFloat(a[sortConfig.key].replace("$", ""))
				: a[sortConfig.key];
		const bValue =
			sortConfig.key === "price"
				? parseFloat(b[sortConfig.key].replace("$", ""))
				: b[sortConfig.key];
		if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
		if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
		return 0;
	});

	const getAllProducts = async (page = 0, size = itemsPerPage, search = "") => {
		try {
			let url = `${
				import.meta.env.VITE_API_URL
			}/products?page=${page}&size=${size}`;
			let urlAll = `${import.meta.env.VITE_API_URL}/products`;
			if (search && search.length > 0) {
				url += `&searchKeyword=${encodeURIComponent(search)}`;
			}
			console.log("url allall", url);
			console.log("search", search);
			const res = await axios.get(url);
			console.log("res product",res.data.data);
			setProducts(res.data.data.content);
			setAllProducts(res.data.data.content)
			setHasNext(res.data.data.hasNext)
			setHasPrevious(res.data.data.hasPrevious);
			setTotalItems(res.data.data.totalElements);
			setTotalPages(res.data.data.totalPages);
			setApiPage(res.data.data.page);
			setCurrentPage(apiPage + 1);
			setItemsPerPage(res.data.data.size);
			setAllProducts(res.data.data.content)
		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.name} `)
			console.log(err);
		}
	 }

	useEffect(() => {
		getAllProducts(apiPage, itemsPerPage, searchQuery);
	}, [apiPage, itemsPerPage, searchQuery, statusFilter]);

	console.log('ttPages', totalPages);

	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};
	const handleSearchChange = (e) => {
		setSearchQuery(e);
	}

	const handleItemsPerPageChange = (size) => { 
		setItemsPerPage(size);
		setApiPage(0);
		setCurrentPage(1);
		getAllProducts(0, size, searchQuery);
	}
	const handlePageChange = (page) => {
		setApiPage(page-1)
		
		setCurrentPage(page);
		getAllProducts(page - 1, itemsPerPage, searchQuery);
	};

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowModal("view");
	};

	const handleAddProduct = () => {
		setSelectedProduct(null);
		setShowModal("add");
	};

	const handleEditProduct = (product) => {
		// const formData = {
		// 	id: product.id,
		// 	name: product.name,
		// 	category: product.category,
		// 	price: product.price.replace("$", ""),
		// 	stock: product.stock.toString(),
		// 	status: product.status,
		// 	description: product.description,
		// 	sku: product.sku,
		// 	variations: [...product.variations],
		// 	tags: [...product.tags],
		// 	images: [...product.image],
		// };

		setSelectedProduct(product);
		setShowModal("edit");
	};

	const handleDeleteProductClick = (product) => {
		setSelectedProduct(product);
		setShowModal("delete");
	};

	const handleDeleteProduct = async(id) => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/products/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			toast.success("Xóa sản phẩm thành công");
			setShowModal(null);
			getAllProducts(apiPage, itemsPerPage, searchQuery);
		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.name} `)
			console.log(err);
		}
	};

	const handleExportExcel = () => {
		exportProductsToExcel(filteredProducts);
	};


	const uploadProductImages = async (productId, imageFiles) => {
		const formData = new FormData();
		imageFiles.forEach((file) => {
			formData.append("images", file);
		});
		try {
			const res = await axios.put(
				`${import.meta.env.VITE_API_URL}/products/${productId}/upload`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return res.data;
		} catch (error) {
			throw error;
		}
	};

	const handleFormSubmit = async (formData, imageFiles) => {
		const newProduct = formatProductForSave(formData, selectedProduct);
		try {
			if (showModal === "add") {
				const productData = {
					name: formData.name,
					description: formData.description,
					price: parseFloat(formData.price),
					stock: parseInt(formData.stock),
					categoryId: formData.categoryId,
				}
				const res = await axios.post(
					`${import.meta.env.VITE_API_URL}/products`,
					productData, {
						headers: {
							Authorization: `Bearer ${token}`,
						}
					}
				)
				if (res.data.status == "SUCCESS" && imageFiles && imageFiles.length > 0) { 

				}

			setProducts([...products, newProduct]);
		} else if (showModal === "edit") {
			setProducts(
				products.map((p) => (p.id === formData.id ? newProduct : p))
			);
		}

		setShowModal(null);

		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.name} `)
			console.log(err);
		}
		
	};


	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Quản lý sản phẩm"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					{/* <motion.div
						className="grid grid-cols-1 gap-5 mb-8 lg:grid-cols-4"
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<StatCard
							name="Total Sales"
							icon={Zap}
							value="$12,345"
							color="#6366F1"
						/>
						<StatCard
							name="New Users"
							icon={Users}
							value="1,234"
							color="#8B5CF6"
						/>
						<StatCard
							name="Total Products"
							icon={ShoppingBag}
							value="567"
							color="#EC4899"
						/>
						<StatCard
							name="Conversion Rate"
							icon={BarChart2}
							value="12,5%"
							color="#10B981"
						/>
					</motion.div> */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<ProductFilters
							searchQuery={searchQuery}
							onSearchChange={handleSearchChange}
							statusFilter={statusFilter}
							onStatusFilterChange={setStatusFilter}
							onExportExcel={handleExportExcel}
							onAddProduct={handleAddProduct}
							statusCounts={statusCounts}
							totalCount={products.length}
						/>

						<ProductList
							products={products}
							apiPage={apiPage}
							currentPage={currentPage}
							productsPerPage={itemsPerPage}
							totalProducts={totalItems}
							totalPages={totalPages}
							onPageChange={handlePageChange}
							onProductsPerPageChange={handleItemsPerPageChange}
							onViewProduct={handleViewProduct}
							onEditProduct={handleEditProduct}
							onDeleteProduct={handleDeleteProductClick}
							hasNext={hasNext}
							hasPrevious={hasPrevious}
							onSort={handleSort}
							sortConfig={sortConfig}
						/>
						{showModal === "view" && selectedProduct && (
							<ProductViewModal
								product={selectedProduct}
								onClose={() => setShowModal(null)}
								onEdit={handleEditProduct}
							/>
						)}

						{(showModal === "add" || showModal === "edit") && (
							<ProductFormModal
								isOpen={true}
								onClose={() => setShowModal(null)}
								onSubmit={handleFormSubmit}
								initialData={
									showModal === "edit"
										? {
												id: selectedProduct.id,
												name: selectedProduct.name,
												category:
													selectedProduct.category,
												price: selectedProduct.price.replace(
													"$",
													""
												),
												stock: selectedProduct.stock.toString(),
												status: selectedProduct.status,
												description:
													selectedProduct.description,
												sku: selectedProduct.sku,
												variations: [
													...selectedProduct.variations,
												],
												tags: [...selectedProduct.tags],
												images: [
													...selectedProduct.image,
												],
										  }
										: null
								}
								formType={showModal}
							/>
						)}

						{showModal === "delete" && selectedProduct && (
							<DeleteProductModal
								isOpen={true}
								onClose={() => setShowModal(null)}
								onConfirm={handleDeleteProduct}
								product={selectedProduct}
							/>
						)}
					</motion.div>
				</main>
			</div>
		</LayoutAdmin>
	);
};

export default ProductAdminPage;
