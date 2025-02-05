import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SiteNotice = () => {
    return (
        <div className='px-8 sm:px-[10vw] md:px-[14vw] lg:px-[20vw] mt-0 pt-5'>
            <h1 className='text-2xl'>Site Notice</h1>
            <h2 className='mb-8'>Webaffinity e.U </h2>
            <Table>
                <TableBody>

                    <TableRow >
                        <TableCell>Adress:</TableCell>
                        <TableCell>Maltheserstraße 3, 9556 Liebenfels, Austria</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Phone:</TableCell>
                        <TableCell>+43-676-89807433</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>E-Mail:</TableCell>
                        <TableCell>mueller.thomas@webaffinity.at</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <p className='text-sm text-[--light] mt-4 mb-14'>Our offers only apply to commercial and public consumers.</p>
            <h2 className='mb-8'>E-Commerce Directive</h2>

            <Table>
                <TableBody>

                    <TableRow >
                        <TableCell>Federal economic chamber:</TableCell>
                        <TableCell>Member of FEC Carinthia</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>UID-Number:</TableCell>
                        <TableCell>ATU61747603</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Company reg. no.:</TableCell>
                        <TableCell>FN262506P</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Company register court:</TableCell>
                        <TableCell>St.Veit</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>IBAN:</TableCell>
                        <TableCell>AT29 2070 6045 0066 9694</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>BIC:</TableCell>
                        <TableCell>KSPKAT2KXXX</TableCell>
                    </TableRow>

                    <TableRow >
                        <TableCell>Liability notice:</TableCell>
                        <TableCell>We do not assume liability for content from external links. The owner of the linked pages must accept responsibility for its content.
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
            <p className='text-sm text-[--light] mt-4'>Flags (c) <a href="https://flagicons.lipis.dev/">flagicons</a></p>
            <p className='text-sm text-[--light] mt-0'>Icons (c) <a href="https://openfontlicense.org/">Font Awesome</a></p>
            <p className='text-sm text-[--light] mt-0'>Images (c) <a href="https://unsplash.com">Unsplash</a></p>



            <h2 className='mt-14 mb-8'>1. Content</h2>
            <p className='text-sm text-[--light]'>Webaffinity e.U. (subsequently referred to as “Webaffinity” or "AI Travel Agent") reserves the right not to be responsible for the topicality, correctness, completeness or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected. All offers are not-binding and without obligation. Parts of the pages or the complete publication including all offers and information might be extended, changed or partly or completely deleted by Webaffinity without separate announcement.</p>

            <h2 className='mt-14 mb-8'>2. Referrals and links</h2>
            <p className='text-sm text-[--light]'>Webaffinity is not responsible for any contents linked or referred to from his pages – unless he has full knowledge of illegal contents and would be able to prevent the visitors of his site fromviewing those pages. If any damage occurs by the use of information presented there, only the author of the respective pages might be liable, not the one who has linked to these pages. Furthermore Webaffinity is not liable for any postings or messages published by users of discussion boards, guestbooks or mailinglists provided on his page.</p>

            <h2 className='mt-14 mb-8'>3. Copyright</h2>
            <p className='text-sm text-[--light]'>Webaffinity intended not to use any copyrighted material for the publication or, if not possible, to indicatethe copyright of the respective object. The copyright for any material created by Webaffinity is reserved. Any duplication or use of objects such as diagrams, sounds or texts in other electronic or printed publications is not permitted without Webaffinity´s agreement, except for the designated press area.</p>

            <h2 className='mt-14 mb-8'>4. Privacy Policy</h2>
            <p className='text-sm text-[--light]'>If the opportunity for the input of personal or business data (email addresses, name, addresses) is given, the input of these data takes place voluntarily. The use and payment of all offered services are permitted – if and so far technically possible and reasonable – without specification of any personal data or under specification of anonymized data or an alias. The use of published postal addresses, telephone numbers and email addresses for marketing purposes is prohibited, offenders sending unwanted spam messages will be punished.</p>

            <h2 className='mt-14 mb-8'>5. Legal validity of this disclaimer</h2>
            <p className='text-sm text-[--light]'>This disclaimer is to be regarded as part of the internet publication which you were referred from. If sections or individual terms of this statement are not legal or correct, the content or validity of the other parts remain uninfluenced by this fact.</p>

        </div>
    )
}

export default SiteNotice
