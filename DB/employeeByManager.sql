Select 
    concat(e.last_name,',',e.first_name) AS 'Direct Report',
    concat(m.last_name,',',m.first_name) AS Manager 
from 
    employees e 
inner join 
    employees m ON m.role_id = e.manager_id 
order by manager
