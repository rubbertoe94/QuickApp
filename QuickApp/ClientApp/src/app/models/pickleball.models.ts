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
export class AddLocationViewModel {
    id: number;
    title: string;
    address: string;
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

    participantId: number;
    participant: UserViewModel;

    locationId: number;
    location: LocationViewModel;

    courtId: number;
    court: CourtViewModel;
}