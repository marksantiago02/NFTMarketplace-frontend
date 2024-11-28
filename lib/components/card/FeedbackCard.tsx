import {Icon} from "@iconify/react";

export default function FeedbackCard({creator, role, avatar}: {creator: string; role: string; avatar: string;}) {
  return (
    <div className="bg-dark-violet">
      <div className="card-gradient p-6 flex flex-col gap-4">
        <div className="flex">
          {
            [1, 2, 3, 4, 5].map((item) => {
              return (
                <Icon
                  key={item}
                  className="text-lg sm:text-xl text-light-blue"
                  icon="solar:star-bold"
                />
              )
            })
          }

        </div>
        <p className="text-left text-[14px]">
          Having natural conversations on social media about your work is authentic and adds another layer of credibility to your company. The main difference between these and other testimonials is that the other types are usually requested, whereas social recommendations are mostly spontaneous.
        </p>
        <div className="flex justify-between">
          <div className="text-left">
            <p className="font-medium">{creator}</p>
            <p>{role}</p>
          </div>
          <img className="!w-10 !h-10" src={avatar} alt="Not Found" />
        </div>
      </div>
    </div>
  );
}