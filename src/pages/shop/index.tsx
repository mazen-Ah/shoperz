import React, {
  useRef,
  useState,
  MouseEvent,
  useEffect,
  useLayoutEffect,
} from "react";
import Head from "next/head";
import ShopUpperbar from "@/features/shop/components/ShopUpperbar";
import ProductCard from "@/features/shop/components/ProductCard";
import ButtonFilter from "@/features/shop/components/ButtonFilter";
import FiltersSidebar from "@/features/shop/components/FiltersSidebar";
import PagginitionButtons from "@/features/shop/components/PagginitionButtons";
import ProductsListWrapper from "@/features/shop/components/ProductsListWrapper";
import {
  getRunningQueriesThunk,
  shoperzApi,
  useAddToCartMutation,
  useGetAllProductsQuery,
} from "@/services/shoperzApi.service";
import { toast } from "react-toastify";
import { selectAppState } from "@/redux/slices/app.slice";
import { useSelector } from "react-redux";
import { wrapper } from "@/redux/store";
import useGetToken from "@/hooks/useGetToken";
import dynamic from "next/dynamic";
import QuickLoadingModul from "@/layout/QuickLoadingModul";
import useResize from "@/hooks/useResize";

const ProductCardGrid = dynamic(() => import("@/components/ProductCardGrid"), {
  loading: () => <QuickLoadingModul />,
});

type Props = {};

const Shop = (props: Props) => {
  const { isLoggedIn } = useSelector(selectAppState);
  const { screenWidth } = useResize();
  const { token } = useGetToken();
  const [fetchAddToCart, addToCartResponse] = useAddToCartMutation();
  const filterRef = useRef<HTMLElement | undefined>(undefined);
  const [productsLimitSelect, setProductsLimitSelect] = useState(20);
  const [page, setPage] = useState(1);
  const [sortMethod, setSortMethod] = useState<sortMethods>("-createdAt");
  const [productsView, setProductsView] = useState<"list" | "grid">(
    screenWidth <= 768 ? "grid" : "list"
  );

  const {
    isError: isProductsError,
    isLoading: isLoadingProducts,
    data: products,
    isSuccess: isSuccessProducts,
  } = useGetAllProductsQuery(
    {
      limit: productsLimitSelect,
      page,
      parts: "pagination,filter",
    },
    {
      refetchOnFocus: true,
    }
  );
  const handleShowFilterbar = () => {
    filterRef.current?.classList.toggle("filter-sidebar-show");
    document.body.classList.toggle("prevent-scroll");
  };
  const handleApplyFilter = (ev: React.FormEvent<HTMLFormElement>) => {
    console.log("apply filter");
    ev?.preventDefault();
    const formdata = new FormData(ev.currentTarget);

    formdata.forEach((el) => console.log(el));
  };
  const handleSortProducts = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const sortSelectedMethod = event.target.value as sortMethods;
      setSortMethod(sortSelectedMethod);
    },
    []
  );
  const handleSelectProductsLimit = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const productsLimit = +event.target.value;
      setProductsLimitSelect(productsLimit);
    },
    []
  );
  function handleSwitchVisibality(btn: HTMLButtonElement): void {
    btn.disabled = true;
    btn.firstElementChild?.classList.replace("flex", "hidden");
    btn.lastElementChild?.classList.replace("hidden", "flex");
  }
  const handleAddToCart = (
    event: MouseEvent<HTMLButtonElement>,
    productId: string,
    quantity: number
  ) => {
    const target = event.target as HTMLButtonElement;
    const btn = target.closest("button") as HTMLButtonElement;
    if (isLoggedIn) {
      // handle switch btw "added to cart" or "add to cart" icons and pragraph
      handleSwitchVisibality(btn);
      fetchAddToCart({ productId, quantity, token: token! });
    } else {
      toast.warning("You are not registered! .");
    }
  };
  const handleChangeProductsView = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    setProductsView(target.dataset.view as "list" | "grid");
  };
  const handleChangePage = (event: MouseEvent) => {
    const target = event.target as HTMLLIElement | HTMLButtonElement;
    if (target.dataset.button === "prev") {
      setPage((page) => page - 1);
    } else if (target.dataset.button === "next") {
      setPage((page) => page + 1);
    } else {
      setPage(+target.dataset.pagenumber!);
    }
  };

  useLayoutEffect(() => {
    if (screenWidth <= 768) {
      setProductsView("grid");
    } else {
      setProductsView("list");
    }
  }, [screenWidth]);

  return (
    <>
      <Head>
        <title> Shop </title>
      </Head>
      <main className="w-full min-h-screen flex items-start justify-between gap-3 container max-w-5xl mx-auto">
        <FiltersSidebar
          ref={filterRef}
          handleClose={handleShowFilterbar}
          handleApply={handleApplyFilter}
        />
        <section className="w-3/4 flex flex-col mt-6 max-lg:w-full max-lg:px-2">
          <ShopUpperbar
            onChangeProductsView={handleChangeProductsView}
            currentProductView={productsView}
            title={"tv & audio"}
            count={products?.data.pagination.length ?? 0}
            fromCount={products?.data.pagination.actualProductsLength ?? 0}
            productsLimitSelect={productsLimitSelect}
            sortMethod={sortMethod}
            onSortSelect={(ev: React.ChangeEvent<HTMLSelectElement>) =>
              handleSortProducts(ev)
            }
            onSelectProductsLimit={(ev: React.ChangeEvent<HTMLSelectElement>) =>
              handleSelectProductsLimit(ev)
            }
          />
          <ProductsListWrapper
            view={productsView}
            apiCallState={{
              isError: isProductsError,
              isLoading: isLoadingProducts,
            }}
            productsLength={products?.data.products?.length}
          >
            {products?.data.products?.map((product) =>
              productsView === "list" ? (
                <ProductCard
                  key={product._id}
                  productData={product}
                  onAddToCart={(ev: MouseEvent<HTMLButtonElement>) =>
                    handleAddToCart(ev, product._id, 1)
                  }
                />
              ) : (
                <ProductCardGrid
                  key={product._id}
                  productData={product}
                  onAddToCart={(ev: MouseEvent<HTMLButtonElement>) =>
                    handleAddToCart(ev, product._id, 1)
                  }
                />
              )
            )}
          </ProductsListWrapper>
          <PagginitionButtons
            actualProductsLength={
              products?.data.pagination.actualProductsLength ?? 0
            }
            remainingPages={products?.data.pagination.remainingPages ?? 0}
            currentPage={page}
            onChangePage={(event) => handleChangePage(event)}
          />
        </section>
        <ButtonFilter onClick={() => handleShowFilterbar()} />
      </main>
    </>
  );
};

export default Shop;

export const getStaticProps = wrapper.getStaticProps(
  ({ dispatch }) =>
    async (context) => {
      dispatch(
        shoperzApi.endpoints.getAllProducts.initiate({
          limit: 20,
          parts: "pagination,filter",
        })
      );
      const [{ data }] = await Promise.all(dispatch(getRunningQueriesThunk()));

      return {
        props: { data },
      };
    }
);
