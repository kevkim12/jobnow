// Worked on by Lawrence Li

/*
This is the footer component for the website.
It will display at the bottom of every page.
*/

export default function Footer() {
    return (
        // Displays the current year and copyright claims
        <p className="text-lg text-white text-center bg-black bottom-0 w-full">
            &copy; {new Date().getFullYear()} JobNow. All Rights Reserved.
        </p>
    );
}
