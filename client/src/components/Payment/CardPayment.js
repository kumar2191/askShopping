import React ,{ useState } from 'react'
import Cards from 'react-credit-cards';
import './cardInputs.css';

const  CardPayment = () => {
    const [number, setnumber] = useState('');
    const [name, setname] = useState('');
    const [cvc, setcvc] = useState('');
    const [focus, setfocus] = useState('');
    const [expiry, setexpiry] = useState('');


    return (
        <div>
            <Cards 
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
            />
            <form>
                <input type='tel' className="cardPayment"
                name='number' 
                placeholder='Card No' 
                value={number}
                onChange={(e)=>setnumber(e.target.value)}
                onFocus={e =>setfocus(e.target.name)}
                 /><br/>
                 <input type='text' className="cardPayment"
                name='name' 
                placeholder='Enter Name' 
                value={name}
                onChange={(e)=>setname(e.target.value)}
                onFocus={e =>setfocus(e.target.name)}
                 /><br/>
                 <input type='text' className="cardPayment"
                name='expiry' 
                placeholder='MM/YY' 
                value={expiry}
                onChange={(e)=>setexpiry(e.target.value)}
                onFocus={e =>setfocus(e.target.name)}
                 /><br/>
                 <input type='tel' className="cardPayment"
                name='cvc' 
                placeholder='Enter CVC' 
                value={cvc}
                onChange={(e)=>setcvc(e.target.value)}
                onFocus={e =>setfocus(e.target.name)}
                 /><br/>
            </form>
        </div>
    )
}

export default CardPayment
