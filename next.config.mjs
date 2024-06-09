/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: 'ogarpvhacquxhraotptc.supabase.co'
            },
            {
                protocol: "https",
                hostname: 'akara-resources.s3.ap-southeast-1.amazonaws.com'
            }

            ],
    },

};

export default nextConfig;
