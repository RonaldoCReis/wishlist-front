import React from 'react';
import { useForm } from 'react-hook-form';
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { useUpdateUserImage } from '@/hooks/queries/useUser';

type UpdateUserImageForm = {
  image: File;
};
type UpdateUserImageFormProps = {
  children: React.ReactNode;
  canEdit?: boolean;
};

const UpdateUserImageForm = ({
  children,
  canEdit,
}: UpdateUserImageFormProps) => {
  const { username } = useParams();
  const { register } = useForm<UpdateUserImageForm>();
  const updateUserImage = useUpdateUserImage();

  const updateImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const image: File = event.target.files![0];

    updateUserImage.mutate(image);
  };

  if (!canEdit) return <Link href={`/u/${username}`}>{children}</Link>;

  return (
    <form>
      <input
        className="hidden"
        id="image"
        type="file"
        {...register('image', { onChange: updateImage })}
      />
      <label className="relative group rounded-full block" htmlFor="image">
        <div className="w-full h-full absolute items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer z-10 flex group-hover:opacity-100 opacity-0 transition duration-100">
          <Pencil color="white" size={28} />
        </div>
        {children}
      </label>
    </form>
  );
};

export default UpdateUserImageForm;
