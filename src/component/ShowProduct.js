import React, { useEffect, useState } from "react";

function ShowProduct(props) {
  const [totalProduct, setTotalProduct] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [variant, setVariant] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const getProduct = () => {
    fetch(`http://127.0.0.1:8000/api/Product/?search=${titleSearch}`)
      .then((res) => res.json())
      .then((data) => setTotalProduct(data));
  };
  useEffect(() => {
    getProduct();
  }, []);
  const getVariant = (id) => {
    if (id === 1) {
      return "Half";
    } else if (id === 2) {
      return "Medium";
    } else {
      return "Full";
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    getProduct();
  };
  console.log(totalProduct);
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Products</h1>
      </div>

      <div className="card">
        <form action="" method="get" className="card-header">
          <div className="form-row justify-content-between">
            <div className="col-md-2">
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                className="form-control"
                onChange={(e) => setTitleSearch(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <select name="variant" id="" className="form-control">
                <option selected disabled>
                  --Select A Variant--
                </option>
              </select>
            </div>

            <div className="col-md-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Price Range</span>
                </div>
                <input
                  type="text"
                  name="price_from"
                  aria-label="First name"
                  placeholder="From"
                  className="form-control"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="text"
                  name="price_to"
                  aria-label="Last name"
                  placeholder="To"
                  className="form-control"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="form-control"
              />
            </div>
            <div className="col-md-1">
              <button
                type="submit"
                className="btn btn-primary float-right"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>

        <div className="card-body">
          <div className="table-response">
            <table className="table" id="product">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Variant</th>
                  <th width="150px">Action</th>
                </tr>
              </thead>

              <tbody>
                {totalProduct &&
                  totalProduct.map((product) => {
                    return (
                      <tr>
                        <td>{product.id}</td>
                        <td>
                          {product.title}
                          <br />
                          Created Time:
                          {product.created_at}
                        </td>
                        <td>{product.description}</td>
                        <td>
                          <dl
                            className="row mb-0"
                            style={{ height: "80px", overflow: "hidden" }}
                            id="variant"
                          >
                            {product.product &&
                              product.product.map((variant) => {
                                return (
                                  <>
                                    <dt className="col-sm-3 pb-0">
                                      {variant.variant &&
                                        getVariant(variant.variant)}
                                    </dt>
                                    <p>- {variant.variant_title}</p>
                                    <dd className="col-sm-9">
                                      <dl className="row mb-0">
                                        <dd className="col-sm-4 pb-0">
                                          Price: {variant.price}
                                        </dd>
                                      </dl>
                                    </dd>
                                  </>
                                );
                              })}
                          </dl>
                          <button
                            onClick="$('#variant').toggleclassName('h-auto')"
                            className="btn btn-sm btn-link"
                          >
                            Show more
                          </button>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <a href="" className="btn btn-success">
                              Edit
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <p>Showing 1 to 10 out of 100</p>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowProduct;
