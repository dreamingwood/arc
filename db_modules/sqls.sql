create or replace function fun_kucun_single (
p_wzbh IN VARCHAR2
) RETURN float as 
v_cucun_je float;
begin
  select round(sum(t.nnowamount)/10000,2)
  into v_cucun_je
  from RMDICT_MATLCARD2 t
    where t.smatlcode = p_wzbh
  group by t.syearmonth ,t.smatlcode,t.smatlname,t.smatltype,t.smatlunit
  order by t.syearmonth;
end fun_kucun_single;
--返回多行报错


--select fun_kucun_single ('008000422040' ) 
--from dual;




create or replace procedure pro_kucun_single (
p_wzbh IN VARCHAR2 --,v_cucun_je out float
) 
as 
  v_je float;
  v_yearmonth varchar2(20);
    cursor cur_a is
    select t.syearmonth, round(sum(t.nnowamount)/10000,2)
    from RMDICT_MATLCARD2 t
      where t.smatlcode = p_wzbh
    group by t.syearmonth ,t.smatlcode,t.smatlname,t.smatltype,t.smatlunit
    order by t.syearmonth;
    
begin
  open cur_a;
  loop
    fetch cur_a  into v_yearmonth,v_je;
    exit when cur_a%notfound;
    DBMS_OUTPUT.PUT(v_yearmonth);
    DBMS_OUTPUT.PUT(', ');
    DBMS_OUTPUT.PUT_LINE(v_je);
  end loop;
  close cur_a;
end pro_kucun_single;
--返回多行报错
--CALL pro_kucun_single( '008000422040' );
