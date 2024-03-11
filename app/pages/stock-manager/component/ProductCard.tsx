"use client";

import React, { useEffect, useState } from "react";
import { ProductProps } from "@/app/pages/stock-manager/component/CateCard";
import ModalContent from "./ProductModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { AiFillDelete } from "react-icons/ai";
import DeleteProduct from "./DeleteModal";
import DeleteModal from "./DeleteModal";
import AddProduct from "./AddProduct";
import HistoryModal from "./HistoryModal";
import { getStockHistory } from "../actions";

const ProductCard = ({
  product = [],
  category_id,
}: {
  product: ProductProps[];
  category_id: number;
}) => {
  product.sort((a, b) => a.product_name.localeCompare(b.product_name));

  const [products, setProducts] = useState(product);
  const [productH, setProductH] = useState(undefined);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const fetchData = async (index: number, product_id: number, category_id: number) => {
    const { result: data, error } = JSON.parse(
      await getStockHistory(product_id)
    );

    if (error) {
      console.log("Cannot fetch product stock history.", error);
      window.alert(error);
    } else {
      console.log(data);
    }
    setProductH(data);
    document.getElementById(`history${index}-${category_id}`)?.showModal();
  };


  useEffect(() => {
    setProducts(product);
  }, [product]);

  useEffect(() => {
    const channel = supabase
      .channel("Products updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product" },
        (payload) => {
          console.log(payload);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setProducts, products]);
  return (
    <div className="mb-2 grid grid-cols-2 gap-5">
      {product.map((item: ProductProps, index: number) => (
        <div
          key={index}
          className="collapse collapse-plus card lg:card-side shadow-xl"
        >
          <input type="checkbox" className="peer" />
          <div className="flex collapse-title">
            <figure className="flex-initial">
              <img
                className="rounded-l-lg"
                style={{ width: "100px", height: "100px" }}
                src={item.image_path}
                alt="Album"
              />
            </figure>
            <div className="flex-initial card-body ">
              <h2 className="card-title">{item.product_name}</h2>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
            </div>
            <div className="flex-initial card-body ">
              <h2 className="card-title">Remains: {item.stock} </h2>
            </div>
          </div>
          <div className="collapse-content">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() =>
                  document
                    .getElementById(`view${index}-${item.category_id}`)
                    ?.showModal()
                }
                className="btn btn-primary"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById(`delete${index}-${item.category_id}`)
                    ?.showModal()
                }
                className="btn btn-primary"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  fetchData(index,item.product_id, item.category_id)
                }
                className="btn btn-primary"
              >
                History
              </button>
            </div>
            <dialog
              id={`view${index}-${item.category_id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <ModalContent product={item} />
            </dialog>
            <dialog
              id={`delete${index}-${item.category_id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <DeleteProduct
                type="product"
                category_id={undefined}
                product_id={item.product_id}
              />
            </dialog>
            <dialog
              id={`history${index}-${item.category_id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <HistoryModal product={item} history={productH} />
            </dialog>
          </div>
        </div>
      ))}
      <div key="add" className=" flex justify-center pt-20 gap-5">
        <button
          onClick={() =>
            document.getElementById(`addproduct-${category_id}`)?.showModal()
          }
          className="btn btn-outline btn-secondary w-48"
        >
          + Add Product
        </button>
        <button
          onClick={() =>
            document.getElementById(`delete-${category_id}`)?.showModal()
          }
          className="btn btn-outline btn-secondary w-48 btn-error"
        >
          <AiFillDelete /> Delete Category
        </button>
        <dialog
          id={`addproduct-${category_id}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <AddProduct category_id={category_id} />
        </dialog>
        <dialog
          id={`delete-${category_id}`}
          className="modal modal-bottom sm:modal-middle"
        >
          <DeleteModal
            type="category"
            category_id={category_id}
            product_id={undefined}
          />
        </dialog>
      </div>
    </div>
  );
};

export default ProductCard;
