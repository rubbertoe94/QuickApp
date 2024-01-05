export interface CourtViewModel {
    id: number;
    locationId: number;
    courtNumber: number;
}

export interface LocationViewModel {
    id: number;
    title: string;
    address: string;
    courts: CourtViewModel[];
}

export interface UserViewModel {
    id: number;
    name: string;
}

export interface LessonViewModel {
    lessonId: number;
    date: string;
    coachId: number;
    coach: UserViewModel;
    locationId: number;
    courtId: number;
}