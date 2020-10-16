
class EventManager {
    constructor() {
        this.urlBase = "api/v1/events"
        this.token = this.obtenerToken();
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerToken() {
        const token = localStorage.getItem('nextUCalendarUser');
        if(!token){
            window.location.href = window.location.origin;
        } else {
            return token;
        }
    }

    eliminarToken() {
        localStorage.removeItem('nextUCalendarUser');
        window.location.href = window.location.origin;
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, { token: this.token }, (response) => {
            this.inicializarCalendario(response);
        }).fail(err => {
            if(err === 'Unauthorized') {
                window.location.href = `${window.location.origin}`;
            }
        });
    }

    eliminarEvento(evento) {
        let eventId = evento._id
        $.post(`${this.urlBase}/delete/${eventId}`, {id: eventId}, () => {
            alert('El evento ha sido eliminado')
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            const title = $('#titulo').val();
            let start = $('#start_date').val();
            let end = '';
            let start_hour = '';
            let end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    token: this.token,
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, () => {
                    alert('Evento guardado exitosamente');
                }).fail(err => {
                    if(err === 'Unauthorized') {
                        window.location.href = `${window.location.origin}`;
                    }
                });
                $('.calendario').fullCalendar('renderEvent', ev)
                location.reload();
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(event) {
        let end;
        if(event.end) {
            end = event.end.toISOString();
        }
        else {
            end = event.start.toISOString();
        }
        $.ajax({
            method: 'PATCH',
            url: `${this.urlBase}/edit`,
            data: {
                id: event._id,
                start:event.start.toISOString(),
                end
            },
        }).done(() => {
            alert('Evento actualizado exitosamente');
        }). fail(err => {
            if(err === 'Unauthorized') {
                window.location.href = `${window.location.origin}`;
            }
        });
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        });
        $('#logoutButton').on('click', () => {
            this.eliminarToken();
        });
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
