export class CourtViewModel {
    id: number;
    locationId: number;
    courtNumber: number;
}

export class LocationViewModel {
    id: number;
    title: string;
    address: string;
    courts: CourtViewModel[];
}

export class UserViewModel {
    id: number;
    name: string;
}

export class LessonViewModel {
    lessonId: number;
    date: string;
    coachId: number;
    coach: UserViewModel;
    locationId: number;
    courtId: number;
}