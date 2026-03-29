import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);

  const MOCK_PRODUCTS = [
    { id: 1, nome: "Smart TV 4K 50\"", preco: 2190.00, img: "https://images.unsplash.com/photo-1593359677759-54373350939b?w=400", promo: true },
    { id: 2, nome: "Fritadeira Air Fryer", preco: 349.90, img: "https://images.unsplash.com/photo-1585659823160-3d1b9ad64bc2?w=400", promo: true },
    { id: 3, nome: "Conjunto Panelas 5pçs", preco: 189.90, img: "https://images.unsplash.com/photo-1584990333910-efed3a05b262?w=400", promo: false },
    { id: 4, nome: "Smartphone 128GB", preco: 1299.00, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400", promo: true },
    { id: 5, nome: "Ventilador Turbo 40cm", preco: 159.00, img: "https://images.unsplash.com/photo-1585136816186-dc565050059f?w=400", promo: false },
    { id: 6, nome: "Batedeira Planetária", preco: 429.00, img: "https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=400", promo: true },
  ];

  const total = cart.reduce((acc, i) => acc + i.preco, 0);

  const finalizarPedido = () => {
    if (cart.length === 0) return;
    const lista = cart.map(i => `- ${i.nome}: R$ ${i.preco.toFixed(2)}`).join('%0A');
    const msg = `*NOVO PEDIDO - DINIZ STORE*%0A%0A${lista}%0A%0A*Total:* R$ ${total.toFixed(2)}`;
    window.open(`https://wa.me/5519999999999?text=${msg}`, '_blank');
    setCart([]);
  };

  const removerDoCarrinho = (idx: number) => setCart(cart.filter((_, i) => i !== idx));

  return (
    <div>
      <nav className="nav-pills">
        <h2 className="nav-title">DINIZ STORE</h2>
        <div style={{display: 'flex', gap: '8px'}}>
          <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>🏠 HOME</button>
          <button className={tab === 'vendas' ? 'active' : ''} onClick={() => setTab('vendas')}>🛒 VITRINE</button>
          <button className={tab === 'contato' ? 'active' : ''} onClick={() => setTab('contato')}>💬 ZAP</button>
          <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}>⚙️ ADM</button>
        </div>
      </nav>

      <div className="container">
        {tab === 'home' && (
          <section className="fade-in">
            <div className="hero-retail">
              <h2>SALDÃO DE<br/>OFERTAS ⚡</h2>
              <p>O preço da Havan com a rapidez de Santa Rita!</p>
              <button className="btn-buy-fast" style={{width: '250px', background: 'var(--urgency)'}} onClick={() => setTab('vendas')}>VER OFERTAS AGORA</button>
            </div>

            <div className="info-bar-grid">
              <div className="info-item-card"><h4>🚚 ENTREGA HOJE</h4><p>Em Santa Rita do Passa Quatro</p></div>
              <div className="info-item-card"><h4>💳 PARCELAMENTO</h4><p>Até 12x no cartão de crédito</p></div>
              <div className="info-item-card"><h4>✅ GARANTIA</h4><p>Troca imediata na loja física</p></div>
            </div>
          </section>
        )}

        {tab === 'vendas' && (
          <div className="layout-vendas fade-in">
            <div className="products-grid">
              {MOCK_PRODUCTS.map((p) => (
                <div key={p.id} className="product-card">
                  {p.promo && <span className="badge-flash">OFERTA DO DIA</span>}
                  <img src={p.img} className="product-img" alt={p.nome} />
                  <div className="product-info">
                    <p style={{color: 'var(--urgency)', fontSize: '0.7rem', fontWeight: 800}}>🔥 ÚLTIMAS UNIDADES</p>
                    <h3>{p.nome}</h3>
                    <div className="price-de">De R$ {(p.preco * 1.25).toFixed(2)}</div>
                    <div className="price-tag">R$ {p.preco.toFixed(2)}</div>
                    <button className="btn-buy-fast" onClick={() => setCart([...cart, p])}>ADICIONAR +</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-sidebar">
              <h3>🛒 Sacola de Compras</h3>
              <div style={{margin: '15px 0', maxHeight: '200px', overflowY: 'auto'}}>
                {cart.length === 0 ? <p style={{color: '#94a3b8'}}>Vazia...</p> : 
                  cart.map((item, idx) => (
                    <div key={idx} className="cart-item" onClick={() => removerDoCarrinho(idx)}>
                      <span style={{fontSize: '0.85rem'}}>{item.nome}</span>
                      <strong style={{color: 'red'}}>R$ {item.preco.toFixed(2)} ❌</strong>
                    </div>
                  ))
                }
              </div>
              <div className="total-box">
                <p style={{fontSize: '0.8rem', fontWeight: 700}}>TOTAL A PAGAR</p>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <button className="btn-buy-fast" disabled={cart.length === 0} onClick={finalizarPedido} style={{background: 'var(--whatsapp)'}}>
                FECHAR PEDIDO NO WHATSAPP
              </button>
            </aside>
          </div>
        )}
        
        {/* Outras abas (contato/admin) permanecem com a lógica anterior */}
      </div>

      <footer className="footer-premium">
        <p><strong>DINIZ STORE</strong> - Santa Rita do Passa Quatro-SP</p>
        <p style={{fontSize: '0.7rem', marginTop: '10px'}}>Desenvolvido por Agência IA Diniz</p>
      </footer>
    </div>
  )
}

export default App
