import React from 'react';

function AddProduct(props) {
    const [productVariantPrices, setProductVariantPrices] = useState([]);
    const [totalVariant, setTotalVariant] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [variantId, setVariantId] = useState("");
    const [price, setPrice] = useState("");
    console.log(variantId, price);
    const [productVariants, setProductVariant] = useState([
      {
        option: 1,
        tags: [],
      },
    ]);
    console.log(typeof totalVariant);
    //handle click event of the Add button
    const handleAddClick = () => {
      let all_variants = JSON.parse(totalVariant.replaceAll("'", '"')).map(
        (el) => el.id
      );
      let selected_variants = productVariants.map((el) => el.option);
      let available_variants = all_variants.filter(
        (entry1) => !selected_variants.some((entry2) => entry1 == entry2)
      );
      setProductVariant([
        ...productVariants,
        {
          option: available_variants[0],
          tags: [],
        },
      ]);
    };
  
    // handle input change on tag input
    const handleInputTagOnChange = (value, index) => {
      let product_variants = [...productVariants];
      product_variants[index].tags = value;
      setProductVariant(product_variants);
  
      checkVariant();
    };
  
    // remove product variant
    const removeProductVariant = (index) => {
      let product_variants = [...productVariants];
      product_variants.splice(index, 1);
      setProductVariant(product_variants);
    };
  
    // check the variant and render all the combination
    const checkVariant = () => {
      let tags = [];
  
      productVariants.filter((item) => {
        tags.push(item.tags);
      });
  
      setProductVariantPrices([]);
  
      getCombn(tags).forEach((item) => {
        setProductVariantPrices((productVariantPrice) => [
          ...productVariantPrice,
          {
            title: item,
            price: 0,
            stock: 0,
          },
        ]);
      });
    };
  
    // combination algorithm
    function getCombn(arr, pre) {
      pre = pre || "";
      if (!arr.length) {
        return pre;
      }
      let ans = arr[0].reduce(function (ans, value) {
        return ans.concat(getCombn(arr.slice(1), pre + value + "/"));
      }, []);
      return ans;
    }
    // load Total variant http://127.0.0.1:8000/Variant/
  
    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/Variant/")
        .then((res) => res.json())
        .then((data) => setTotalVariant(data));
    }, []);
    console.log(totalVariant);
    // Save product
    const saveVariantPrice = async () => {
      let formField = new FormData();
  
      formField.append("price", price);
  
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/ProductVariant/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
    };
    let saveProduct = async (event) => {
      event.preventDefault();
  
      let formField = new FormData();
      formField.append("title", title);
      formField.append("description", description);
      formField.append("sku", sku);
      saveVariantPrice();
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/Product/",
        data: formField,
      }).then((response) => {
        console.log(response.data);
      });
    };
    return (
        <section>
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="">Product Name</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Product SKU</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="form-control"
                    onChange={(e) => setSku(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Description</label>
                  <textarea
                    id=""
                    cols="30"
                    rows="4"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Variants</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="">Option</label>
                        <select
                          className="form-control"
                          onChange={(e) => setVariantId(e.target.value)}
                        >
                          {totalVariant &&
                            totalVariant.map((variant, index) => {
                              return (
                                <option key={index} value={variant.id}>
                                  {variant.title}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <label htmlFor="">Price</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={saveProduct} className="btn btn-lg btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AddProduct;