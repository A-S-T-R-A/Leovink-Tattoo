import { IContactData } from "../types/type"
import instagramIcon from "./instagram.png"
import viberIcon from "./viber.png"
import facebookIcon from "./facebook.png"

export const contactData: IContactData = {
    location: "Chisinau, Ismail 40/2 str.",
    phone: "+1(337) 228-14-88",
    mail: "leov_tattoo@gmail.com",
    description:
        "The studio is located approximately a 7-minute walk from the exit of the underground passage at the intersection of Stefan cel Mare Boulevard and Izmail Street. The landmark is the Unic department store. You need to go up Izmail Street towards the former Republican Stadium. If you arrive by taxi, ask the driver to drop you off right in front of the studio, located on the main Izmail Street at 40/2. The address is exactly in the middle between Bucharest Street and August 31 Street. There are no parking spaces at the studio, but if you come by car, you can find parking nearby. There is one parking spot on August 31 Street, between Izmail and Lev Tolstoy, or on Bucharest Street, also between Lev Tolstoy and Izmail. Both parking lots are within a 3-4 minute walk from the studio.",
    socials: [
        { icon: instagramIcon, link: "https://www.instagram.com" },
        { icon: facebookIcon, link: "https://www.facebook.com" },
        { icon: viberIcon, link: "https://viber.com" },
    ],
}
