import createClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    token: process.env.REACT_APP_SANITY_TOKEN,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-06-29',
})

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source); 