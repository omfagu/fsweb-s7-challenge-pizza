import React from "react";
import "./style/OrderPizza.css"
import {useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import * as Yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from "reactstrap";
import { useHistory } from 'react-router-dom';




const OrderPizza=() => {
    
    const [size, setSize] = useState("");
    const [fiyat, setFiyat] = useState(85.50);
    const [hamur, setHamur] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [obje, setObje] = useState({});
    const [kontrol, setKontrol] = useState(false);
    const [not, setNot] = useState("");
    
    const history = useHistory();

    const handleClick = (e) => {
        if (e.target.value === "kucuk") {
            setFiyat(fiyat-10);
            setSize("Küçük")
            setKontrol(true);
          } else if (e.target.value === "orta") {
            setFiyat(85.50);
            setSize("Orta")
            setKontrol(true);
          } else if (e.target.value === "buyuk") {
            setFiyat(fiyat+20);
            setSize("Büyük")
            setKontrol(true);
          }
        
      };

      const inputChange = (e) => {
        
        setNot(e.target.value)
    
      };

      const schema = Yup.object().shape({
        hamur: Yup.string().required("Hamur Kalınlığı seçimi zorunludur."),  
        size: Yup.string().oneOf(["Küçük", "Orta", "Büyük"], "Lütfen Boyut Seçiniz"),
        selectedItems: Yup.array().max(10, "En fazla on öğe seçebilirsiniz."),
      });

      useEffect(() => {
        const pizza = { fiyat, hamur, size, selectedItems, not };
        setObje(pizza);
      }, [fiyat, hamur, size, selectedItems, not]);

      const Submit = (e) => {
        e.preventDefault();
        schema.validate({ hamur: hamur, size: size, selectedItems: selectedItems })
        if (kontrol== true){        // boş form gitmesin diye kontrol
            axios
            .post("https://reqres.in/api/orders", obje)
            .then((res) => {
              console.log(res.data);       
              console.log(obje);
              history.push('/Success');
    
            })
            .catch(() => {
    
            });}
        else {
            history.push('/');
        }

      };

      const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
          setSelectedItems([...selectedItems, value]);
          setFiyat(fiyat+5);
        } 
      };


    return(
        
        <div className="container-2">
            <div className="nav-bar">
            <nav>
            <ul>
                <li>
                    <Link to ="/"> Anasayfa -</Link>
                </li>
                <li>
                    <Link to ="/secenekler">Seçenekler -</Link>
                </li>
                <li>
                    <Link to ="/pizza">Sipariş Oluştur </Link>
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
                        <h3>{fiyat} ₺</h3>
                    </div>
            </div>
            <form onSubmit={Submit}>
                <div className="content-2">
                        <div className="boyut1">
                            <h4>Boyut Seç *</h4>
                            <div>
                            <input type="radio" id="kucuk"  name="boyut" value="kucuk" onClick={handleClick} />
                            Küçük
                            </div>

                            <div>
                            <div>
                            <input type="radio" id="orta"  name="boyut" value="orta"  onClick={handleClick} />
                            Orta
                            </div>
                            </div>

                            <div>
                            <div>
                            <input type="radio" id="buyuk"  name="boyut" value="buyuk" onClick={handleClick}/>
                            Büyük
                            </div>
                            </div>

                        </div>
                        <div className="hamur">
                            <h4>Hamur Seç *</h4>
                            <select value={hamur} onChange={(e) => setHamur(e.target.value)}>
                            <option value="">Hamur Kalınlığı</option>
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
                    <div>
                        <input type="checkbox" id="item1" name="items" value="item1" onChange={handleChange} />
                        <label htmlFor="item1">Pepperoni</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item2" name="items" value="item2" onChange={handleChange} />
                        <label htmlFor="item2">Sosis</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item3" name="items" value="item3" onChange={handleChange} />
                        <label htmlFor="item3">Kanada Jambonu</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item4" name="items" value="item4" onChange={handleChange} />
                        <label htmlFor="item4">Tavuk Izgara</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item5" name="items" value="item5" onChange={handleChange} />
                        <label htmlFor="item5">Soğan</label>
                    </div>
                    </div>


                    <div className="checkbox-3">
                    <div>
                        <input type="checkbox" id="item6" name="items" value="item6" onChange={handleChange} />
                        <label htmlFor="item6">Domates</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item7" name="items" value="item7" onChange={handleChange} />
                        <label htmlFor="item7">Mısır</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item8" name="items" value="item8" onChange={handleChange} />
                        <label htmlFor="item8">Sucuk</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item9" name="items" value="item9" onChange={handleChange} />
                        <label htmlFor="item9">Jalepeno</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item10" name="items" value="item10" onChange={handleChange} />
                        <label htmlFor="item10">Sarımsak</label>
                    </div>
                    </div>

                    <div className="checkbox-2">
                    <div>
                        <input type="checkbox" id="item11" name="items" value="item11" onChange={handleChange} />
                        <label htmlFor="item6">Biber</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item12" name="items" value="item12" onChange={handleChange} />
                        <label htmlFor="item7">Sucuk</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item13" name="items" value="item13" onChange={handleChange} />
                        <label htmlFor="item8">Ananas</label>
                    </div>
                    <div>
                        <input type="checkbox" id="item14" name="items" value="item14" onChange={handleChange} />
                        <label htmlFor="item9">Kabak</label>
                    </div>
                    </div>

                </div>
                <div className="siparis-notu">
                    <h4>Sipariş Notu</h4>
                    <Input style={{padding: "2rem"}} onChange={inputChange}></Input>
                </div>
                <div className="submit-button">
                    <Button  style={{ paddingLeft: "4rem", paddingRight: "4rem" }} color="warning" type="submit">Siparişi Ver </Button>
                        {' '}
                    <h3>Toplam {fiyat} TL</h3>
                </div>
                
            </form>
                
                
                
            </div>
            

           </div>



            
        </div>
    )
}

export default OrderPizza;