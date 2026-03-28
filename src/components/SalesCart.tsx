import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

export function SalesCart() {
  const [products, setProducts] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('products').select('*')
      if (data) setProducts(data)
    }
    fetch()
  }, [])

  const total = cart.reduce((acc, item) => acc + (item.preco * item.qty), 0)

  const addToCart = (p: any) => {
    setCart(prev => {
      const found = prev.find(i => i.id === p.id)
      if (found) return prev.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i)
      return [...prev, {...p, qty: 1}]
    })
  }

  return (
    <div className="pdv-container">
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img 
              src={`https://source.unsplash.com/featured/?${p.nome},product`} 
              alt={p.nome} 
              className="product-image" 
            />
            <h3>{p.nome}</h3>
            <p className="price">R$ {p.preco.toFixed(2)}</p>
            <button className="btn-cta" style={{width: '100%'}} onClick={() => addToCart(p)}>
              + Adicionar
            </button>
          </div>
        ))}
      </div>

      <div className="cart-sidebar">
        <h2 style={{marginTop: 0}}>🛒 Carrinho</h2>
        <div style={{minHeight: '200px'}}>
          {cart.map(item => (
            <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span>{item.qty}x {item.nome}</span>
              <span>R$ {(item.preco * item.qty).toFixed(2)}</span>
            </div>
          ))}
          {cart.length === 0 && <p style={{color: '#64748b'}}>Nenhum item selecionado</p>}
        </div>

        <div className="total-box">
          <small>TOTAL DA COMPRA</small>
          <div className="total-price">R$ {total.toFixed(2)}</div>
        </div>
        
        <button 
          className="btn-cta" 
          style={{width: '100%', marginTop: '20px', background: '#22c55e'}}
          disabled={cart.length === 0}
          onClick={() => {alert('Venda Finalizada!'); setCart([])}}
        >
          FINALIZAR VENDA
        </button>
      </div>
    </div>
  )
}