import { FieldProps, FormikValues, getIn } from "formik";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import GenericCompanyImage from "../../GenericCompanyImage/GenericCompanyImage";

const LogoInput: React.FC<
  FieldProps<FormikValues> & { image: string; loading: boolean }
> = ({
  field,
  form: { touched, errors, setFieldValue },
  image=null,
  loading = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(image);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const fieldError = getIn(errors, field.name);
  const fieldTouched = getIn(touched, field.name);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Update the selectedImage state to display the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Set the field value to the selected image file
      setFieldValue(field.name, file);
    }
  };

  useEffect(() => {
    setSelectedImage(image);
  }, [image]);

  return loading ? (
    <div className="rounded-full">
      <Skeleton
        width={60}
        height={60}
        borderRadius={"100%"}
        containerClassName="mt-[-3px]"
      />
    </div>
  ) : (
    <div>
      <div onClick={() => fileRef.current && fileRef.current.click()}>
        <div
          className={`flex items-center justify-center gap-4 cursor-pointer  ${
            selectedImage || image ? "block" : "hidden"
          }`}
        >
          <GenericCompanyImage logo={selectedImage ?? image ??  ''} width={60} height={60} />
        </div>
      </div>
      <div
        onClick={() => fileRef.current && fileRef.current.click()}
        className={`flex items-center gap-4 cursor-pointer ${
          selectedImage || image ? "hidden" : "block"
        }`}
      >
        <div
          className={`bg-gray_1 min-w-[60px] min-h-[60px] rounded-full `}
        ></div>

        <div>
          <div className="text-gray_2">Selecione o logotipo</div>
          <div className="text-sm text-gray_1">
            Arquivos suportados: JPG, JPEG, PNG, SVG
          </div>
          <div className="text-sm text-gray_1">Tamanho máximo: 2MB</div>
        </div>
      </div>

      <input
        ref={(el) => {
          fileRef.current = el;
        }}
        type="file"
        accept="image/jpeg, image/png, image/svg, image/jpg" // Specify accepted file types
        onChange={handleImageChange} // Handle image selection
        style={{ display: "none" }}
      />
      {fieldTouched && fieldError ? (
        <div className="text-red text-sm text-left">{fieldError as string}</div>
      ) : null}
    </div>
  );
};

export default LogoInput;
