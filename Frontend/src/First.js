import React, { useState, useEffect } from "react";
import Store from "./Store";

const data = [
  {
    id: 1,
    productname: "Food",
    price: "$30",
    amount: "30",
    image:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    productname: "heart",
    price: "$60",
    amount: "60",
    image:
      "https://images.pexels.com/photos/5625002/pexels-photo-5625002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    productname: "heart",
    price: "$90",
    amount: "90",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const First = () => {
  const [datas, setData] = useState(false);
  const [value, setvalue] = useState();

  const handleClick = (id) => {
    console.log(id, "pppppppppp");
    setData(true);
    let values = data.filter((datass) => {
      return datass.id === id;
    });
    setvalue(values);
  };

  return (
    <>
      {datas === false ? (
        <>
          <div className="container mt-5">
            <div className="row">
              {" "}
              {data.map((item) => {
                return (
                  <>
                    <div className="col-md-4 d-flex">
                      <div className="card">
                        <div>
                          <img
                            src={item.image}
                            class="card-img-top img-fluid"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{item.productname}</h5>
                          <p className="card-text">PRICE: {item.price}</p>

                          <button
                            className="btn btn-primary"
                            onClick={() => handleClick(item.id)}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Store name={value} />
        </>
      )}
    </>
  );
};

export default First;
