import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res?.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data?.products);
          console.log(data?.products);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log(JSON.stringify(data, null, 2));

  const productsToShow = products.slice(page * 10 - 10, page * 10);
  const totalNumberOfPages = Math.floor(products.length / 10);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleSelectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalNumberOfPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {productsToShow?.map((item, index) => {
        return (
          <div className="products" key={item?.id + index?.toString()}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div
              style={{ width: "100%", height: 1, backgroundColor: "gray" }}
            />
          </div>
        );
      })}
      <div style={{ display: "flex" }}>
        <p>{`Page ${page} of ${totalNumberOfPages}`}</p>
        <div
          style={{
            marginLeft: "1rem",
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center"
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => handleSelectedPage(page - 1)}
          >
            Previous
          </button>

          {[...Array(products.length / 10)].map((_, index) => (
            <p
              key={index + 1 + index.toString()}
              style={{
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 15,
                backgroundColor: index + 1 === page ? "blue" : "white",
                width: 30,
                height: 30,
                textAlign: "center"
              }}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </p>
          ))}
          <button
            disabled={page === totalNumberOfPages}
            onClick={() => handleSelectedPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
