import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { useForm } from "react-hook-form";
import { api } from "../../utils/api";
import { getCepData } from "../../services/CepService/CepService";

export function CadastroPage() {
    const { register, handleSubmit, setValue } = useForm();
    const navigate = useNavigate();

    async function addUser(values) {
        try {
            const resposta = await api('/users', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!resposta.ok) {
                alert('Houve um erro ao cadastrar o usuário');
            } else {
                alert('Cadastrado com sucesso');
                navigate('/');
            }
        } catch (error) {
            alert('Houve um erro ao cadastrar o usuário');
            console.error(error.message);
        }
    }

    const checkCEP = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        
        if (cep.length !== 8) {
            alert('CEP inválido. Por favor, insira um CEP válido.');
            return;
        }

        try {
            const cepData = await getCepData(cep);
            setValue('endereco.rua', cepData.address_name);
            setValue('endereco.bairro', cepData.district);
            setValue('endereco.cidade', cepData.city);
            setValue('endereco.estado', cepData.state);
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Houve um erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    };

    return (
        <main>
            <div className="cadastro-container">
                <h1>Cadastro de Usuário</h1>
                <form onSubmit={handleSubmit(addUser)}>
                    <div className="form-layout">
                        <div className="form-field">
                            <label htmlFor="nome">Nome</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite o nome do usuário"
                                {...register('nome', { required: 'O nome é obrigatório' })}
                            />
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="sexo">Sexo</label>
                            <select
                                id="sexo"
                                {...register('sexo', { required: 'O sexo é obrigatório' })}
                            >
                                <option value="">Selecione</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                id="telefone"
                                type="text"
                                placeholder="Digite o telefone"
                                {...register('telefone')}
                            />
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                id="cpf"
                                type="text"
                                placeholder="Digite o CPF"
                                {...register('cpf', { required: 'O CPF é obrigatório' })}
                            />
                        </div>

                        <div className="form-field half-width">
                            <label htmlFor="data_nascimento">Data de Nascimento</label>
                            <input
                                id="data_nascimento"
                                type="date"
                                {...register('data_nascimento', { required: 'A data de nascimento é obrigatória' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Digite o email"
                                {...register('email', { required: 'O email é obrigatório' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="senha">Senha</label>
                            <input
                                id="senha"
                                type="password"
                                placeholder="Digite a senha"
                                {...register('senha', { required: 'A senha é obrigatória' })}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="cep">CEP</label>
                            <input
                                id="cep"
                                type="text"
                                placeholder="Digite o CEP"
                                {...register('endereco.cep', { required: 'O CEP é obrigatório' })}
                                onBlur={checkCEP}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="rua">Rua</label>
                            <input
                                id="rua"
                                type="text"
                                placeholder="Digite a rua"
                                {...register('endereco.rua')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                id="bairro"
                                type="text"
                                placeholder="Digite o bairro"
                                {...register('endereco.bairro')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                id="cidade"
                                type="text"
                                placeholder="Digite a cidade"
                                {...register('endereco.cidade')}
                            />
                        </div>

                        <div className="form-field full-width">
                            <label htmlFor="estado">Estado</label>
                            <input
                                id="estado"
                                type="text"
                                placeholder="Digite o estado"
                                {...register('endereco.estado')}
                            />
                        </div>
                    </div>
                    <button className="btn-submit" type="submit">Cadastrar</button>
                </form>
                <p className="login-link">Já possui cadastro? <Link to="/">Efetuar login</Link></p>
            </div>
        </main>
    );
}
