import useData from "./useData";
export interface Project {
  _id: string;
  name: string;
  owner: string;
  categories: Categories[];
  config: {
    useTime: boolean;
    votingStartDayAndTime: Date;
    votingEndDayAndTime: Date;
    votingEnabled: boolean;
    limitVotesToOnePerIp: boolean;
  };
}

export interface Categories {
  option1: CatergorieOption;
  option2: CatergorieOption;
  title: string;
}
export interface CatergorieOption {
  key: string;
  name: string;
  color: colorSelection;
}
export type colorSelection = "blue" | "pink" | "white";

export type ServerExpectedProjectData = Pick<
  Project,
  "name" | "config" | "categories"
>;

const useProjects = (projectId?: string) =>
  useData<Project, ServerExpectedProjectData>("/project" + (projectId || ""));
export default useProjects;
