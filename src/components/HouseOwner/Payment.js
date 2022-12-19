import React, { useState } from 'react';
import mainbg from '../img/main-bg.png'
import shape from '../img/shape.png'
import icons from '../img/icons.png'
import { useNavigate } from 'react-router-dom';


function Payment() {
    const current = new Date();
    const [status, setStatus] = useState();
    const paydate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const [amount, setamount] = useState('');
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState('');
    let auth =  sessionStorage.getItem('jwthouseowner');
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/invoice/',{
          method: 'GET',
          headers:{
            Accept: 'application/json',
                     'Content-Type': 'application/json',
                     'Authorization': auth,
             },
            })
            .then(response => {
              console.log("request: ", response);
              return response.json();
             
            })
            .then((res)=>{
              console.log("response: ", res);
              setTotalAmount(res.grandtotal);
              console.log("total amount",res.grandtotal);
           
            })
    const handlesubmit = (e) => {
        e.preventDefault();
            var options = {
                key: "rzp_test_vCz7dMxFI6qC94",
                key_secret: "395d1wGWipzT22lMFrAspjjx",
                amount: totalAmount * 100,
                currenty: "INR",
                name: "Test Razorpay",
                description: "Razorpay project",
                handler: function (response) {
                    console.log(response.razorpay_payment_id);
                    alert("Payment Successfull");
                    
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                notes: {
                    address: "",
                },
                theme: {
                    color: "#000"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        fetch("http://127.0.0.1:8000/zerowaste/houseowner/payment/", {
            headers:{
                Accept: 'application/json',
                         'Content-Type': 'application/json',
                         'Authorization': auth,
                 },
                        method: "POST",
                        body: JSON.stringify({
                        paydate: paydate,
                        grandtotal: totalAmount,
                        status: 1,
                        })
                    })
                        .then(response => {
                        console.log("request: ", response);
                        return response.json();
                        })
                        .then(resJson => {
                        console.log("response: ", resJson);
                        console.log("status",resJson.status);
                        if(resJson.status === 1){
                            navigate('/houseownerservices')    
                        }
                    })
    }
    return (
        <section className='main'>
            <div className="page-shape">
                <img src={shape} alt="razorpay paygateway integration" />
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='column-wrap justify-content-between'>
                            <div className="banner-img">
                                <img src={mainbg} alt="Razorpay demo reacjs" />
                            </div>
                            <div className="title">
                                <div className="title-content">
                                    <h1>Razorpay Payment</h1>
                                </div>
                            </div>
                            <div className="technology">
                                <div className="tech-logo">
                                    <img src={icons} alt="Razorpay test payment" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className="column-wrap justify-content-center">
                            <div className="fxt-form">
                                <h3 className='mb-3'>Pay Now</h3>
                                <form>
                                    <div className="form-group mt-5">
                                        <input type="text" className="form-control" value={totalAmount}  placeholder={totalAmount} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" onClick={handlesubmit} className="btn-submit">Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Payment;