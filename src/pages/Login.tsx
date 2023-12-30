import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Login = () => {
    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")
    
    const navigate = useNavigate()

    const validar = (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (login === "admin" && senha === "admin") {
          toast.success("Login realizado com sucesso")
          navigate("/home")
        } else {
          toast.error("Credenciais inválidas ou usuário não cadastrado!")
        }
    }
    
  return (
    <div className='drop-shadow-xl'>
      <div className="min-h-screen flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7" >
              <form onSubmit={validar}>
                <h1 className="font-bold text-center text-2xl mb-14">Login</h1>
                <label className="font-semibold text-sm text-black pb-1 block">Nome do Usuário</label>
                <input type="text" onChange={(e)=>{setLogin(e.target.value)}} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <label className="font-semibold text-sm text-black pb-1 block">Senha</label>
                <input type="password" onChange={(e)=>{setSenha(e.target.value)}} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                <button
                  type="submit"
                  className="p-2 bg-black text-white border border-gray-400 shadow-xl rounded-full w-full font-semibold transition duration-300 hover:bg-white hover:text-black"
                >
                  <span className="inline-block mr-2">Entrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>  
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
