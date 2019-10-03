from events.common.utils import ChoiceEnum


class Category(ChoiceEnum):
    technical = 'Technical'
    cultural = 'Cultural'
    workshop = 'Workshop'
    lecture = 'Lecture'


class EventType(ChoiceEnum):
    dance = 'Dance'
    music = 'Music'
    literary_art = 'Literary Art'
    speaking_art = 'Speaking Art'
