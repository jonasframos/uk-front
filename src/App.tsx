import { RoutesComponent } from "./routes/RoutesComponent";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";
import { Colors } from "./utils/constants/style";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { registerLocale } from "react-datepicker";
import { useEffect } from "react";
import { useStore } from "./store/useStore";



registerLocale("pt-BR", ptBR);

const App: React.FC<{}> = () => {
  // const { isModalOpen, modalContent } = useModal();
  const modalStack = useStore((state) => state.modal.modalStack);

  useEffect(() => {}, []); 

  return (
      <div className="App text-black text-base">
        <SkeletonTheme baseColor={Colors.gray_1} highlightColor="#E9EAED">
          <RoutesComponent />
          <ToastContainer />
          {
            modalStack.map((modalContent, index) => (
              <div key={index} className="modal-container">
                {modalContent}
              </div>
            ))
          }
        </SkeletonTheme>
      </div>
  );
};

export default App;
