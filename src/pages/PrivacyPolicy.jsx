import React from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <div className='px-8 sm:px-[10vw] md:px-[14vw] lg:px-[20vw] mt-0 pt-5'>
            <h1 className='text-2xl'>Privacy Policy</h1>
            <h2 className='mb-8'>Webaffinity e.U </h2>
            <p className='text-sm text-[--light]'>Here at Webaffinity protecting the personal data of our customers and their end-users is, and has always been, of the utmost priority.</p>

            <h2 className='mt-14 mb-8'>Preamble</h2>
            <p className='text-sm text-[--light] mb-6'>This policy details how Webaffinity (or “we” or “us”) and the associated websites treat the personal information that we collect, what settings we provide for you to control how your information is used on Webaffinity, and how you can contact us with any questions or concerns. This policy is not a contract between Webaffinity and its users, but is merely a recitation of Webaffinity’s policies. Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. This policy may change from time to time, so please check the policy periodically for updates.</p>

            <h2 className='mt-14 mb-8'>How we collect personal information</h2>
            <p className='text-sm text-[--light] mb-4'>This policy describes the types of information we may collect from you or that you may provide when you visit the websites travel-buddy.com or any of their affiliated websites (our “Website”) and our practices for collecting, using, maintaining, protecting, and disclosing that information. It also applies to information we collect:</p>
            <ol className='list-decimal text-sm text-[--light] ml-8'>
                <li>in email, text, and other electronic messages between you and us</li>
                <li>through mobile and desktop applications you download from our Website, which provide dedicated non-browser-based interaction between you and this Website</li>
                <li>when you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this policy</li>
                <li>through any other sources associated with our Website</li>
            </ol>
            <h2 className='mt-14 mb-8'>Categories of Data Subjects and Data Collected</h2>
            <p className='text-sm text-[--light]'>Webaffinity only collects data from users who either join, or engage with, the Webaffinity Websites and products. Webaffinity is committed to only collecting data that is necessary for Webaffinity to provide the content and services of the Webaffinity products.</p>

            <p className='text-sm text-[--light] mb-8 mt-8'>

                Children Under the Age of 18:
                Webaffinity’s Terms of Use require all account owners to be at least 18 years of age If you are under 18, do not use the site or services.
            </p>
            <p className='text-sm text-[--light] mb-8'>

                Information We Collect About You:
                Depending on which services you choose to use, Webaffinity collects several types of information from and about users of our Website, including: Name, Contact Information (e.g. physical address, email address, phone number), Company Name.</p>

            <p className='text-sm text-[--light] mb-4'>
                We collect this information: </p>
            <ol className='list-decimal text-sm text-[--light] mb-8 ml-8'>
                <li>Directly from you when you provide it to us</li>
                <li>Automatically as you navigate through the site</li>
            </ol>
            <p className='text-sm text-[--light] mb-4 mt-4'>
                Information You Provide to Us: </p>
            <p className='text-sm text-[--light] mb-4 mt-2'>
                You may also provide information to XEOWebaffinity such as the following: </p>
            <ol className='list-decimal text-sm text-[--light] ml-8'>
                <li>information that you provide by filling in forms</li>
                <li>information provided at the time of registering to use Webaffinity Websites</li>
                <li>information when you enter a promotion sponsored by Webaffinity</li>
                <li>information when you report a problem with Webaffinity Websites</li>
                <li>records and copies of your correspondence (including email addresses), if you contact Webaffinity</li>
                <li>your responses to surveys that we might ask you to complete for research purposes</li>
                <li>details of transactions you carry out through the Webaffinity Websites and of the fulfillment of your orders</li>
                <li>financial information before placing an order through the Webaffinity Websites</li>
                <li>your search queries on the Webaffinity Websites</li>
                <li>visit or participate in our online community</li>
            </ol>
            <p className='text-sm text-[--light] mt-10'>
                You also may provide information to be published or displayed (hereinafter, “posted”) on public areas of the community or transmitted to other users of the community or third parties (collectively, “User Contributions”). Your User Contributions are posted on and transmitted to others at your own risk. Although we limit access to certain pages and you may set certain privacy settings for such information by logging into your account profile, please be aware that no security measures are perfect or impenetrable. Additionally, we cannot control the actions of other users of the Website with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed by unauthorized persons.</p>

            <p className='text-sm text-[--light] mb-2 mt-8'>
                Information We Collect Through Automatic Data Collection Technologies:</p>
            <p className='text-sm text-[--light] mb-2 mt-4'>
                As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns. This will only be collected if you have explicitly consented to it. This information includes:
            </p>
            <ol className='list-decimal text-sm text-[--light] ml-8'>
                <li>details of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website</li>
                <li>information about your computer and internet connection, including your IP address, operating system, and browser type</li>
            </ol>
            <p className='text-sm text-[--light] mb-2 mt-4'>
                The information we collect automatically is statistical data and does not include personal information, but we may maintain it or associate it with personal information we collect in other ways or receive from third parties. It helps us to improve our Website and to deliver a better and more personalized service, including by enabling us to:            </p>
            <ol className='list-decimal text-sm text-[--light] ml-8'>
                <li>estimate our audience size and usage patterns</li>
                <li>store information about your preferences, allowing us to customize our Website according to your individual interests</li>
                <li>speed up your searches</li>
                <li>recognize you when you return to our Website</li>
            </ol>

            <p className='text-sm text-[--light] mb-2 mt-8'>
                We do not handle or monitor “Do Not Track” signals, but we do provide you with the ability to control certain cookies and similar tracking technologies.</p>

            <p className='text-sm text-[--light] mb-2 mt-8'>
                For additional information on how Webaffinity uses and handles cookies and other tracking technology, please see our <Link to={"/cookie-policy"} className='underline text-black dark:text-white'>Cookie Policy</Link></p>
            <h2 className='mt-14 mb-8'>Potential Recipients</h2>
            <p className='text-sm text-[--light] mb-4'>
                Webaffinity only provides your data to third party recipients who are necessary to provide Webaffinity’ services or content,
                where necessary to the conduct of the business, or where legally required. Your personal information may be disclosed:
            </p>
            <ul className='list-disc text-sm text-[--light] ml-8 mb-4'>
                <li>to our subsidiaries and affiliates;</li>
                <li>to contractors, service providers, and other third parties we use to support our business;</li>
                <li>to a buyer or successor in the event of a merger, divestiture, restructuring, or similar proceeding;</li>
                <li>to fulfill the purpose for which you provide it;</li>
                <li>for any other purpose disclosed when you provide the information;</li>
                <li>with your consent;</li>
                <li>to comply with legal requirements;</li>
                <li>to enforce our Terms of Use or protect rights and safety.</li>
            </ul>
            <p className='text-sm text-[--light] mb-8'>
                In some cases, we may disclose aggregated and deidentified information to certain third parties.
            </p>

            <h2 className='mt-14 mb-8'>Data Retention Period</h2>
            <p className='text-sm text-[--light] mb-4'>
                Webaffinity will retain your information as long as your account is active or needed for services. If you wish to withdraw consent, see “Withdrawal of Consent/Erasure” below.
                Upon account closure, Webaffinity will retain your information only as required by legal obligations. The Webaffinity service will be automatically uninstalled from devices, deleting all files.
            </p>

            <h2 className='mt-14 mb-8'>Security Policies for Data</h2>
            <p className='text-sm text-[--light] mb-4'>
                Webaffinity has implemented security measures to protect your personal information from unauthorized access, use, alteration, and disclosure.
                We follow industry best practices for data protection.
            </p>
            <p className='text-sm text-[--light] mb-4'>
                Your security also depends on you. Where we provide a password, you must keep it confidential. Be cautious when sharing information in public areas of our Website.
            </p>
            <p className='text-sm text-[--light] mb-8'>
                While we strive to protect your data, internet transmission is not completely secure. Any transmission is at your own risk.
            </p>

            <h2 className='mt-14 mb-8'>Your Rights</h2>
            <ul className='list-disc text-sm text-[--light] ml-8 mb-4'>
                <li>Request correction of inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Request access to your data.</li>
                <li>Request data portability to another controller.</li>
                <li>Withdraw consent for data processing.</li>
            </ul>
            <p className='text-sm text-[--light] mb-4'>
                To exercise these rights, email <a href='mailto:support@webaffinity.at' className='underline text-black dark:text-white'>support@ai-travel-buddy.at</a> with your name (, company,) and email.
            </p>
            <p className='text-sm text-[--light] mb-8'>
                Note: Deleting personal data also deletes your user account, which may affect services like communications and purchases.
            </p>

            <h2 className='mt-14 mb-8'>Data Processing Officer</h2>
            <p className='text-sm text-[--light] mb-4'>
                You can contact the Webaffinity Data Processing Officer at <a href='mailto:support@ai-travel-buddy.com' className='underline text-black dark:text-white'>support@ai-travel-buddy.at</a>.
            </p>

            <h2 className='mt-14 mb-8'>Contact Information</h2>
            <p className='text-sm text-[--light] mb-4'>
                If you have questions, contact us at <a href='mailto:support@ai-travel-buddy.at' className='underline text-black dark:text-white'>support@ai-travel-buddy.at</a> or at:
            </p>
            <p className='text-sm text-[--light] mb-4'>
                Webaffinity e.U.<br />
                Maltheserstraße 3<br />
                9556 Liebenfels, Austria
            </p>

        </div>
    )
}

export default PrivacyPolicy
