import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/OrderPizza.css";

const OrderPizza = () => {
  const [size, setSize] = useState("");
  const [not, setNot] = useState("");
  const [hamur, setHamur] = useState("");
  const [fiyat, setFiyat] = useState(0);
  const [genelToplam, setGenelToplam] = useState(0);
  const [ekmalzemeFiyati, setEkmalzemeFiyati] = useState(0);
  const [pizzaAdet, setPizzaAdet] = useState(1);
  const [obje, setObje] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const history = useHistory();

  const checkboxValues = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Ananas",
    "Kabak",
  ];

  const radioValues = ["Küçük", "Orta", "Büyük"];

  const boyutHandle = (e) => {
    if (e.target.value === "Küçük") {
      setFiyat(75.5);
      setSize("Küçük");
    } else if (e.target.value === "Orta") {
      setFiyat(85.5);
      setSize("Orta");
    } else if (e.target.value === "Büyük") {
      setFiyat(95.5);
      setSize("Büyük");
    }
  };

  const checkboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEkmalzemeFiyati(ekmalzemeFiyati + 5);
      setSelectedItems([...selectedItems, value]);
    } else {
      setEkmalzemeFiyati(ekmalzemeFiyati - 5);
      setSelectedItems(selectedItems.filter((selected) => selected !== value));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(data)
      .then(() => {
        axios
          .post("https://reqres.in/api/orders", obje)
          .then((res) => {
            console.log(res.data);
            history.push("/Success");
          })
          .catch(() => {});
      })
      .catch((errors) => {
        console.error(errors);
      });
  };

  const inputChange = (e) => {
    setNot(e.target.value);
  };

  useEffect(() => {
    const pizza = { fiyat, hamur, size, selectedItems, not };
    setObje(pizza);
  }, [fiyat, hamur, size, selectedItems, not]);

  useEffect(() => {
    const yeniFiyat = fiyat + ekmalzemeFiyati;
    const yeniToplam = yeniFiyat * pizzaAdet;
    setGenelToplam(yeniToplam);
  }, [fiyat, selectedItems, pizzaAdet, ekmalzemeFiyati]);

  const schema = Yup.object().shape({
    hamur: Yup.string().required("Hamur Kalınlığı seçimi zorunludur."),
    size: Yup.string().oneOf(
      ["Küçük", "Orta", "Büyük"],
      "Lütfen Boyut Seçiniz"
    ),
    selectedItems: Yup.array().max(10, "En fazla on öğe seçebilirsiniz."),
  });

  const data = {
    hamur,
    size,
    selectedItems,
  };

  const artir = (e) => {
    if (fiyat !== 0) {
      setPizzaAdet(pizzaAdet + 1);
    }
  };

  const eksilt = (e) => {
    if (pizzaAdet !== 1) {
      setPizzaAdet(pizzaAdet - 1);
    }
  };

  return (
    <div className="container-2">
      <div className="nav-bar">
        <nav>
          <ul>
            <li>
              <Link to="/"> Anasayfa -</Link>
            </li>
            <li>
              <Link to="/secenekler">Seçenekler -</Link>
            </li>
            <li>
              <Link to="/pizza">Sipariş Oluştur </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <div className="content-1">
          <div className="header">
            <div className="head">
              <h2>Position Absolute Acı Pizza</h2>
              <br></br>
              <h3>{genelToplam} ₺</h3>
            </div>
            <div className="head">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ornare quam viverra orci sagittis eu volutpat. Feugiat sed
                lectus vestibulum mattis ullamcorper velit sed ullamcorper.
              </p>
            </div>
            <form id="pizza-form" onSubmit={formSubmit}>
              <div className="radio-form">
                <div className="boyut">
                  <h4>
                    Boyut Seç <span style={{ color: "red" }}>*</span>
                  </h4>
                  {radioValues.map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="boyut"
                        value={value}
                        onChange={boyutHandle}
                      />
                      {value}
                    </label>
                  ))}
                </div>

                <div className="hamur">
                  <h4>
                    Hamur Seç <span style={{ color: "red" }}>*</span>
                  </h4>
                  <select
                    value={hamur}
                    onChange={(e) => setHamur(e.target.value)}
                  >
                    <option disabled hidden value="">
                      Hamur Kalınlığı
                    </option>
                    <option value="normal">Normal Hamur</option>
                    <option value="ince">İnce Hamur</option>
                    <option value="kalin">Kalın Hamur</option>
                  </select>
                </div>
              </div>
              <div className="head-2">
                <h4>Ek Malzemeler</h4>
                <p>En Fazla 10 malzeme seçebilirsiniz. 5 TL</p>
              </div>

              <div className="ek-malzemeler">
                <div className="checkbox-1">
                  {checkboxValues.map((value) => (
                    <label key={value}>
                      <input
                        type="checkbox"
                        value={value}
                        onChange={checkboxChange}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="siparis-notu">
                <h4>Sipariş Notu</h4>
                <Input
                  placeholder="Siparişine eklemek istediğin bir not var mı?"
                  type="textarea"
                  onChange={inputChange}
                ></Input>
              </div>
              <hr></hr>
              <div className="bottom">
                <div className="pizza-adet">
                  <div className="eksi" onClick={() => eksilt()}>
                    <p>-</p>
                  </div>
                  <div className="adet-sayisi">
                    <p>{pizzaAdet}</p>
                  </div>
                  <div className="arti" onClick={() => artir()}>
                    <p>+</p>
                  </div>
                </div>
                <div className="siparis-detayi">
                  <div className="siparis-toplami">Sipariş Toplamı</div>

                  <div className="ekstra-malzeme">
                    <span style={{ paddingLeft: "2rem" }}>Seçimler</span>
                    <span style={{ paddingLeft: "8rem" }}>
                      {ekmalzemeFiyati} ₺
                    </span>
                  </div>
                  <br></br>
                  <div className="ekstra-malzeme" style={{ color: "red" }}>
                    <span style={{ paddingLeft: "2rem" }}>Toplam</span>
                    <span style={{ paddingLeft: "8.7rem" }}>
                      {genelToplam} ₺
                    </span>
                  </div>

                  <div className="submit-button">
                    <Button id="order-button" type="submit">
                      SİPARİŞ VER
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="pizza-adet"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderPizza;
