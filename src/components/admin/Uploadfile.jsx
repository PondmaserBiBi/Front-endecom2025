import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, upLoadFiles } from '../../api/Product'
import useEcomStore from '../../store/ecom-store'
import { FaXmark } from "react-icons/fa6";


const Uploadfile = ({ form, setForm }) => {

    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleonChange = (e) => {

        const files = e.target.files
        if (!files) return

        setIsLoading(true)

        for (let i = 0; i < files.length; i++) {

            const file = files[i]

            if (!file.type.startsWith('image/')) {
                toast.error(`File ${file.name} is not image`)
                continue
            }

            Resize.imageFileResizer(
                file,
                720,
                720,
                'JPEG',
                100,
                0,
                (data) => {

                    upLoadFiles(token, data)
                        .then((response) => {

                            setForm((prev) => ({
                                ...prev,
                                images: [...prev.images, response.data],
                            }))


                            toast.success('Upload Image Success')
                            setIsLoading(false)

                            e.target.value = ''
                        })
                        .catch((error) => {
                            console.log(error)
                            toast.error('Upload failed')
                            setIsLoading(false)
                        })

                },
                'base64'
            )
        }
    }

    const handleDelete = (public_id) => {


        const images = form.images

        removeFiles(token, public_id)

            .then((response) => {


                setForm((prev) => ({

                    ...prev,
                    images: prev.images.filter(

                        (image) => image.public_id !== public_id
                    )
                }))

                toast.success(response.data)

            })
            .catch((error) => {
                console.log(error)
                toast.error('ลบรูปไม่สำเร็จ')
            })

    }

    return (

        <div>

            <div className='flex mx-4 gap-4 my-4'>

                {
                    form.images.map((image, index) =>
                        <div key={index} className='relative'>

                            <img className='w-30 h-30'
                                src={image.url} />
                            <span onClick={() => handleDelete(image.public_id)} className='absolute top-0 right-0 bg-red-500'><FaXmark /></span>
                        </div>)
                }




            </div>

            <div>

                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleonChange}
                />

            </div>
            {isLoading && <p>Uploading...</p>}
        </div>
    )
}


export default Uploadfile