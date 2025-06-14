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

} from "@/components/admin/productAdmin/productExcel";
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
	const [isActive, setIsActive] = useState(true);
	const [sortConfig, setSortConfig] = useState({
		key: null,
		direction: null,
	});
	const [statusFilter, setStatusFilter] = useState(true);
	// const [token, setToken] = useState(
	// 	localStorage.getItem("accessToken")
	// 		? JSON.parse(localStorage.getItem("accessToken"))
	// 		: null
	// )
	const [token, setToken] = useState(
		"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnaEZQT3RhMXhva0NVX3ZjU25Zc19TTEZMOXdrVl9aUnNVWU5nXzAtQzV3In0.eyJleHAiOjE3NDk5Mzk5MjEsImlhdCI6MTc0OTkzODEyMSwianRpIjoiOThiNjAyMDItN2VhMS00MDRkLWFiNzItMjJiZTQ5MDdmYTY5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkwL3JlYWxtcy9lY29tbWVyY2UiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNDIxNzU5NDUtODgxOS00MTU0LThlZTMtNWE1MDA1YTgzY2FiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWljcm8tc2VydmljZS1hcGkiLCJzZXNzaW9uX3N0YXRlIjoiNjg5M2EyZjMtN2JlNi00OGZjLWFjZmQtOTBkOTJlZWVkM2EwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1lY29tbWVyY2UiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiQURNSU4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI2ODkzYTJmMy03YmU2LTQ4ZmMtYWNmZC05MGQ5MmVlZWQzYTAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJhZG1pbiBhZG1pbjEyMyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwiZmFtaWx5X25hbWUiOiJhZG1pbjEyMyIsImVtYWlsIjoidnRobjMwM0BnbWFpbC5jb20ifQ.adN6CNecBru4WAAnejcGzh9o6MyWupc37-PZPNg61SO6Mzb6XvteYzxVQ4DacyiKDAbg_6v8d9gRAnVEbdGLFcruIoHuxnIwBPFcSGE3gnAFaLgIVC5cpQRRKyt2-yMpHoHVweBcQv2mZbGqHB9TJ7dkL_ydV-aaJRRMIMQY3vsiVHcD1YK8rICepFX5YZZOnRpQS8Jr3uHzMn8EsrI6TAL5Ds13d-YBBNsw6dBkfdCAQljmJBzE8mPBY5aZkwtLfTLaHrtaZlh1RwDHeVuiu1VBu4LFqJpjFhq8KpsLyjHbrlIagmOCO6gKYlJBUtAFl4Z5FvuITPJB20YesZsYuQ"
	)

	const filteredProducts = products.filter(
		(product) =>
			(product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				product.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
			(statusFilter === "All" || product.status === statusFilter)
	);


	const getAllProducts = async (page = 0, size = itemsPerPage, search = "") => {
		try {
			let url = `${
				import.meta.env.VITE_API_URL
			}/products?page=${page}&size=${size}`;
			let urlAll = `${import.meta.env.VITE_API_URL}/products`;
			if (search && search.length > 0) {
				url += `&searchKeyword=${encodeURIComponent(search)}`;
			}
			if (statusFilter == true) {
				url += `&status=true`;
			}else{
				url += `&status=false`;
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
			setIsActive(res.data.data.isActive)
		} catch (err) {
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `)
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
	
	const handleStatusFilterChange = (newStatus) => {
		setStatusFilter(newStatus);
		setApiPage(0);
		setCurrentPage(1);
	}

	const handleViewProduct = (product) => {
		setSelectedProduct(product);
		setShowModal("view");
	};

	const handleAddProduct = () => {
		setSelectedProduct(null);
		setShowModal("add");
	};

	const handleEditProduct = (product) => {
		
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
			toast.error(`Lỗi: ${err.message} - Nguyên nhân: ${err.response.statusText} `)
			console.log(err);
		}
	};

	const handleExportExcel = () => {
		exportProductsToExcel(filteredProducts);
	};

	const handleToggleActive = async (product) => {
		try {
			const res = await axios.put(
				`${import.meta.env.VITE_API_URL}/products/${product.id}/status`,
				{}, 
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			toast.success("Thay đổi trạng thái thành công!");
			getAllProducts(apiPage, itemsPerPage, searchQuery);
			
		} catch (err) {
			toast.error(`Lỗi: ${err.message} \n Nguyên nhân: ${err.response.statusText} `)
		}
	}
const handleFormSubmit = async (formData, imageFiles) => {
  const formdata = new FormData();
  formdata.append('name', formData.name);
  formdata.append('description', formData.description);
  formdata.append('price', formData.price);
  formdata.append('categoryId', formData.categoryId);

  if (showModal === "edit" && formData.images && formData.images.length > 0) {
    formData.images.forEach(url => {
      formdata.append('existingImageUrls', url);
    });
  }

  if (imageFiles && imageFiles.length > 0) {
    imageFiles.forEach(file => {
      formdata.append('images', file);
    });
  }

  for(let pair of formdata.entries()) {
    console.log(pair[0]+ ': ' + pair[1]);
  }

  try {
    if (showModal === "add") {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        formdata,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Thêm sản phẩm thành công");
    } else if (showModal === "edit") {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${formData.id}`,
        formdata,
        {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật sản phẩm thành công");
    }
    setShowModal(null);
    getAllProducts(apiPage, itemsPerPage, searchQuery);
  } catch (err) {
    toast.error(`Lỗi: ${err.message} \n Nguyên nhân: ${err.response?.statusText || ""}`);
    console.log(err);
  }
};


	return (
		<LayoutAdmin>
			<div className="flex-1 overflow-auto relative z-10">
				<HeaderAdmin title={"Quản lý sản phẩm"} />
				<main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 10, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<ProductFilters
							searchQuery={searchQuery}
							onSearchChange={handleSearchChange}
							statusFilter={statusFilter}
							onStatusFilterChange={handleStatusFilterChange}
							onExportExcel={handleExportExcel}
							onAddProduct={handleAddProduct}
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
							onToggleActive={handleToggleActive}
						/>
						{showModal === "view" && selectedProduct && (
							<ProductViewModal
								product={selectedProduct}
								onClose={() => setShowModal(null)}
								onEdit={handleEditProduct}
								token={token}
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
