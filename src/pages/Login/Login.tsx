import { LoginForm } from './components/LoginForm';

const Login = () => {
  return (
    <main className='min-h-screen bg-[url(./assets/images/institucional/black-background.jpg)] bg-cover bg-center bg-no-repeat flex flex-col gap-10 justify-center items-center'>
      <div className='bg-white px-6 py-8 rounded-[12px] text-gray_3 md:w-[408px] text-center'>
        <h1 className='text-2xl font-bold mb-5'>Entre com suas credenciais</h1>
        <LoginForm />
      </div>
      <div
        style={{ position: 'fixed', bottom: 50, left: 0, width: '100%', zIndex: 50 }}
        className='flex justify-center'
      >
        <a className='text-white' target='_blank' href='https://www.jornadasat.com.br'>
          www.<strong>jornadasat</strong>.com.br
        </a>
      </div>
    </main>
  );
};

export default Login;
