import { ContactsInfinityScroll } from '../../../widgets/contacts-infinity-scroll';
import { Filter } from '../../../widgets/filter';

export const ContactsListPage = () => {
    return (
        <>
            <Filter />
            <ContactsInfinityScroll />
        </>
    );
};
