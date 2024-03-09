import React, { Ref, SVGProps, forwardRef } from "react";

const EmailIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
    return (

        <svg {...props} ref={ref} xmlns="http://www.w3.org/2000/svg" width="123" height="20" viewBox="0 0 123 20" fill="none">
        </svg>
    );
};

const ForwardRef = forwardRef(EmailIcon);
export default ForwardRef;
