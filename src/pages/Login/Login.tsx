import { LoginForm } from './components/LoginForm';

const Login = () => {
  return (
    <main className='min-h-screen bg-[url(./assets/images/map-light.jpg)] bg-cover bg-center bg-no-repeat flex flex-col gap-10 justify-center items-center'>
      <div className='bg-white px-6 py-8 rounded-[12px] text-gray_3 md:w-[408px] text-center'>
        <LoginForm />
      </div>
      <div
        style={{ position: 'fixed', bottom: 50, left: 0, width: '100%', zIndex: 50 }}
        className='flex justify-center'
      >
      </div>
    </main>
  );
};

export default Login;
