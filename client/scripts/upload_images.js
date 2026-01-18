import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const images = [
    { path: 'C:/Users/jmrsai/.gemini/antigravity/brain/f997f7d4-63a4-40b0-b202-0e72e65f5d22/uploaded_image_0_1768661216733.jpg', caption: 'Venkateswara Swamy Alankaram' },
    { path: 'C:/Users/jmrsai/.gemini/antigravity/brain/f997f7d4-63a4-40b0-b202-0e72e65f5d22/uploaded_image_1_1768661216733.jpg', caption: 'Divine Darshan' },
    { path: 'C:/Users/jmrsai/.gemini/antigravity/brain/f997f7d4-63a4-40b0-b202-0e72e65f5d22/uploaded_image_2_1768661216733.jpg', caption: 'Lord Venkateswara' },
    { path: 'C:/Users/jmrsai/.gemini/antigravity/brain/f997f7d4-63a4-40b0-b202-0e72e65f5d22/uploaded_image_3_1768661216733.jpg', caption: 'Goddess Lakshmi' },
    { path: 'C:/Users/jmrsai/.gemini/antigravity/brain/f997f7d4-63a4-40b0-b202-0e72e65f5d22/uploaded_image_4_1768661216733.jpg', caption: 'Temple Deity' },
]

async function uploadImages() {
    console.log('Starting image upload...')

    for (const img of images) {
        if (!fs.existsSync(img.path)) {
            console.error(`File not found: ${img.path}`)
            continue
        }

        const fileName = path.basename(img.path)
        const fileBuffer = fs.readFileSync(img.path)
        const storagePath = `gallery/${fileName}`

        console.log(`Uploading ${fileName}...`)

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('images')
            .upload(storagePath, fileBuffer, {
                contentType: 'image/jpeg',
                upsert: true
            })

        if (uploadError) {
            console.error(`Error uploading ${fileName}:`, uploadError.message)
            continue
        }

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(storagePath)

        console.log(`Inserting metadata for ${fileName}...`)

        const { error: dbError } = await supabase
            .from('gallery')
            .insert([{ url: publicUrl, caption: img.caption, type: 'image' }])

        if (dbError) {
            console.error(`Error inserting metadata for ${fileName}:`, dbError.message)
        } else {
            console.log(`Successfully uploaded and recorded ${fileName}`)
        }
    }

    console.log('Upload process complete.')
}

uploadImages()
