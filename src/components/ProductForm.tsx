import { useState } from 'react'
import { supabase } from '../services/supabaseClient' // Ajuste o caminho se necessário

export function ProductForm() {
  const [nome, setNome] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('products')
      .insert([
        { 
          nome, 
          preco: parseFloat(preco), 
          estoque: parseInt(estoque) 
        }
      ])

    if (error) {
      alert('Erro ao salvar: ' + error.message)
    } else {
      alert('Produto cadastrado com sucesso! ✅')
      setNome('')
      setPreco('')
      setEstoque('')
    }
    setLoading(false)
  }

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
      <h3>Cadastrar Novo Produto</h3>
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Nome do Produto (ex: Biscoito 1,99)" 
          value={nome} 
          onChange={e => setNome(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Preço de Venda" 
          value={preco} 
          onChange={e => setPreco(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="number" 
          placeholder="Quantidade Inicial em Estoque" 
          value={estoque} 
          onChange={e => setEstoque(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            background: loading ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            padding: '10px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Salvando...' : 'Salvar no Banco'}
        </button>
      </form>
    </div>
  )
}